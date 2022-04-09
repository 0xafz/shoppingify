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

    const loggedUser = checkAuth(req)

    switch (method) {
      case "GET": {
        checkAuth(req)

        const { cursor, limit = 10 } = req.query
        const lists = await prisma.shoppingList.findMany({
          where: {
            userId: loggedUser.id,
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
            userId: loggedUser.id,
          },
        })
        res.status(200).json({ data: newList })
      }
      default:
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    handleError(error, res)
  }
}
