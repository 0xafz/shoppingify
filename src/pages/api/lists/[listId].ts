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
    const { id, userId } = req.query

    if (!id || !userId) throw new ClientError("invalid request parameters")

    switch (method) {
      case "GET": {
        const { id } = req.query
        const list = await prisma.shoppingList.findFirst({
          where: {
            id: Number(id),
            userId: Number(userId),
          },
        })
        if (!list) throw new ClientError("list not found")
        res.status(200).json({ data: list })
      }
      case "PATCH": {
        const list = await prisma.shoppingList.findFirst({
          where: {
            id: Number(id),
            userId: Number(userId),
          },
        })
        if (!list) throw new ClientError("list not found")
        const updatedList = await prisma.shoppingList.update({
          where: {
            id: Number(id),
          },
          data: req.body,
        })
        res.status(200).json({ data: updatedList })
      }
      case "DELETE": {
        await prisma.shoppingList.delete({
          where: {
            id: Number(id),
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
