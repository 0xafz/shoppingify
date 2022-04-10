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
      case "GET":
        {
          const { cursor, limit = 10 } = req.query
          const lists = await prisma.shoppingList.findMany({
            where: {
              userId: loggedUser.id,
            },
            take: Number(limit),
            orderBy: {
              id: "asc",
            },
            cursor: cursor
              ? {
                  id: Number(cursor),
                }
              : undefined,
          })
          res.status(200).json({
            data: {
              lists,
              nextCursor:
                lists.length && lists.length === limit
                  ? lists[lists.length - 1].id
                  : "",
            },
          })
        }
        break
      case "POST":
        {
          const { name, status = "incomplete", items: rawItems = [] } = req.body

          if (!name) throw new ClientError("missing/empty field(s)")

          const createdAt = new Date().toISOString()

          const itemIds = rawItems.map(({ id, ...other }) => ({
            where: {
              id: id,
            },
            create: {
              ...other,
              createdAt,
              user: {
                // connect shoppingItem user
                connect: {
                  id: loggedUser.id,
                },
              },
            },
          }))

          const newList = await prisma.shoppingList.create({
            data: {
              name,
              status,
              shoppingItems: {
                connectOrCreate: itemIds,
              },
              createdAt,
              user: {
                // connect shoppingList user
                connect: {
                  id: loggedUser.id,
                },
              },
            },
          })
          res.status(200).json({ data: newList })
        }
        break
      default:
        res.setHeader("Allow", ["GET", "POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    handleError(error, res)
  }
}
