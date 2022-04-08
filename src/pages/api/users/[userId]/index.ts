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
        const user = await prisma.user.findFirst({
          where: {
            id: Number(userId),
          },
        })
        if (!user) throw new ClientError("user not found")
        res.status(200).json({ data: user })
      }
      case "PATCH": {
        const user = await prisma.user.findFirst({
          where: {
            id: Number(userId),
          },
        })
        if (!user) throw new ClientError("user not found")
        const updatedUser = await prisma.user.update({
          where: {
            id: Number(userId),
          },
          data: req.body,
        })
        res.status(200).json({ data: updatedUser })
      }
      case "DELETE": {
        await prisma.user.delete({
          where: {
            id: Number(userId),
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
