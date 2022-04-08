import { serialize } from "cookie"
import { NextApiRequest, NextApiResponse } from "next"
import { loginCookieName } from "~/constants"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      res.setHeader(
        "Set-Cookie",
        serialize(loginCookieName, "", {
          maxAge: -1,
          path: "/",
        })
      )
      return res.json({ ok: true })
    } else {
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "something went wrong!" })
  }
}
