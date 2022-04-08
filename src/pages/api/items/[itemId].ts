import { Prisma } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "~/lib/prisma"
import { ClientError, KnownServerError } from "~/utils/error"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req
    const { itemId } = req.query
    if (!itemId) throw new ClientError("invalid request parameters")
    switch (method) {
      case "GET": {
        const item = await prisma.shoppingItem.findFirst({
          where: {
            id: Number(itemId),
          },
        })
        if (!item) throw new ClientError("item not found")
        res.status(200).json({ data: item })
      }
      case "PATCH": {
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
          data: req.body,
        })
        res.status(200).json({ data: updatedItem })
      }
      case "DELETE": {
        await prisma.shoppingItem.delete({
          where: {
            id: Number(itemId),
          },
        })
        res.status(200).send("successfully deleted")
      }
      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    if (error instanceof ClientError) {
      res.status(400).json({ error: error.message })
    } else if (error instanceof KnownServerError) {
      res.status(500).json({ error: error.message })
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(500).json({ error: "something went wrong!" })
    }
  }
}
