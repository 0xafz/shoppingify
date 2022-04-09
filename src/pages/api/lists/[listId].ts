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
    const { listId } = req.query

    if (!listId) throw new ClientError("invalid request parameters")

    checkAuth(req)

    switch (method) {
      case "GET":
        {
          const list = await prisma.shoppingList.findFirst({
            where: {
              id: Number(listId),
            },
          })
          if (!list) throw new ClientError("list not found")
          res.status(200).json({ data: list })
        }
        break
      case "PATCH":
        {
          const { status, name } = req.body
          const list = await prisma.shoppingList.findFirst({
            where: {
              id: Number(listId),
            },
          })
          if (!list) throw new ClientError("list not found")
          const updatedList = await prisma.shoppingList.update({
            where: {
              id: Number(listId),
            },
            data: {
              status,
              name,
            },
          })
          res.status(200).json({ data: updatedList })
        }
        break
      case "DELETE":
        {
          await prisma.shoppingList.delete({
            where: {
              id: Number(listId),
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
