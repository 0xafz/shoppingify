import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "~/lib/prisma"
import checkAuth from "~/middleware/checkAuth"
import { ClientError, handleError } from "~/utils/api/error"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req
    const { itemId } = req.query
    if (!itemId) throw new ClientError("invalid request parameters")

    checkAuth(req)

    switch (method) {
      case "GET":
        {
          const item = await prisma.shoppingItem.findFirst({
            where: {
              id: Number(itemId),
            },
          })
          if (!item) throw new ClientError("item not found")
          res.status(200).json({ data: item })
        }
        break
      case "PATCH":
        {
          const { note, imageUrl, name, category } = req.body
          const item = await prisma.shoppingItem.findFirst({
            where: {
              id: Number(itemId),
            },
          })
          if (!item) throw new ClientError("item not found")
          const updatedItem = await prisma.shoppingItem.update({
            where: {
              id: Number(itemId),
            },
            data: {
              note,
              imageUrl,
              name,
              category,
            },
          })
          res.status(200).json({ data: updatedItem })
        }
        break
      case "DELETE":
        {
          await prisma.shoppingItem.delete({
            where: {
              id: Number(itemId),
            },
          })
          res.status(200).send("successfully deleted")
        }
        break
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    handleError(error, res)
  }
}
