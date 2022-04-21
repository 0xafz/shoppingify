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
    const { userId } = req.query
    if (!userId) throw new ClientError("invalid request parameters")

    checkAuth(req)

    switch (method) {
      case "PATCH":
        {
          const { name, avatar } = req.body
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
            data: {
              name,
              avatar,
            },
          })
          res.status(200).json({ data: updatedUser })
        }
        break
      case "DELETE":
        {
          await prisma.user.delete({
            where: {
              id: Number(userId),
            },
          })
          res.status(200).json({
            data: "success",
          })
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
