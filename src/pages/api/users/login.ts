import crypto from "crypto"
import { NextApiRequest, NextApiResponse } from "next"
import { loginCookieAge, loginCookieName, refreshTokenTtl } from "~/constants"
import prisma from "~/lib/prisma"
import { setHardCookie } from "~/utils/api"
import { checkPassword, SignWithUserClaims, uuidv4 } from "~/utils/api/crypto"
import { handleError } from "~/utils/api/error"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!user) {
        return res.status(400).json({ error: "User not found" })
      }
      if (!user.password) {
        // OAuth user
        return res.status(401).json({ error: "Invalid credentials" })
      }
      const validPassword = await checkPassword(password, user.password)

      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" })
      }
      // Update user refresh token and refresh token expiration
      const refreshToken = uuidv4()

      await prisma.session.update({
        where: {
          userId: user.id,
        },
        data: {
          refreshToken,
          refreshTokenExpiresAt: new Date(
            Date.now() + refreshTokenTtl
          ).toISOString(),
        },
      })
      // //Generate a random string that will constitute the fingerprint for this user
      const fingerprint = crypto.randomBytes(50).toString("hex")

      // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
      // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
      setHardCookie(loginCookieName, fingerprint, res, {
        maxAge: loginCookieAge,
      })
      const jwt = SignWithUserClaims(user, fingerprint)

      return res.status(200).json({
        data: {
          jwt,
          refreshToken,
        },
      })
    } else {
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (err) {
    handleError(err, res)
  }
}
