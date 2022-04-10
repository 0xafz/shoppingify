import { NextApiRequest, NextApiResponse } from "next"
import checkAuth from "~/middleware/checkAuth"
import { ClientError, handleError } from "~/utils/api/error"
import prisma from "~/lib/prisma"
import { UserSelect } from "~/utils/api/select"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req
    switch (method) {
      case "GET":
        {
          const loggedUser = checkAuth(req)
          const user = await prisma.user.findFirst({
            where: {
              id: loggedUser.id,
            },
            select: UserSelect,
          })
          if (!user) throw new ClientError("user not found")
          res.status(200).json({ data: user })
        }
        break
      default:
        res.setHeader("Allow", ["GET"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    handleError(error, res)
  }
}
