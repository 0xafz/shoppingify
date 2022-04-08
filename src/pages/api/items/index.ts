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
    switch (method) {
      case "GET": {
        const { cursor, limit } = req.query
        const items = await prisma.shoppingItem.findMany({
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
            items,
            nextCursor: items.length ? items[items.length - 1].id : "",
          },
        })
      }
      case "POST": {
        const { name, note, imageUrl, categoryName } = req.body

        if (!categoryName) throw new ClientError("categoryName not provided")
        let category = await prisma.shoppingCategory.findFirst({
          where: {
            name: {
              // https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#case-insensitive-filtering
              // mysql is case-insensitive by default
              equals: categoryName,
            },
          },
        })
        if (!category) {
          category = await prisma.shoppingCategory.create({
            data: {
              name: categoryName,
            },
          })
        }

        const newItem = await prisma.shoppingItem.create({
          data: {
            name,
            note,
            imageUrl,
            createdAt: new Date().toISOString(),
            shoppingCategoryId: category.id,
            userId: Number(userId),
          },
        })
        res.status(200).json({ data: newItem })
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
