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
    const { userId } = req.query
    if (!userId) throw new ClientError("invalid request parameters")
    switch (method) {
      case "GET": {
        const { cursor, limit = 10 } = req.query
        const lists = await prisma.shoppingList.findMany({
          where: {
            userId: Number(userId),
          },
          take: Number(limit),
          orderBy: {
            id: "asc",
          },
          cursor: {
            id: Number(cursor),
          },
        })
        res.status(200).json({
          data: {
            lists,
            nextCursor: lists.length ? lists[lists.length - 1].id : "",
          },
        })
      }
      case "POST": {
        const { name, status, items } = req.body

        if (!name || !status) throw new ClientError("empty parameters")
        const newList = await prisma.shoppingList.create({
          data: {
            name,
            status,
            items: {
              create: Array.isArray(items) ? items : [],
            },
            createdAt: new Date().toISOString(),
            userId: Number(userId),
          },
        })
        res.status(200).json({ data: newList })
      }
      default:
        res.setHeader("Allow", ["GET", "POST"])
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
