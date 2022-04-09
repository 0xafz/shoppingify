import { NextApiRequest, NextApiResponse } from "next"
import { loginCookieName, refreshTokenTtl } from "~/constants"
import prisma from "~/lib/prisma"
import { getCookie } from "~/utils/api"
import { sha256, SignWithUserClaims, uuidv4 } from "~/utils/api/crypto"
import { handleError } from "~/utils/api/error"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { refreshToken, fingerPrintHash } = req.body

      // get un-hashed fingerprint cookie from req headers
      const fingerprintCookie = getCookie(req.headers.cookie, loginCookieName)
      console.log({ fingerprintCookie })
      if (!fingerprintCookie) {
        return res.status(401).json({ error: "invalid signature" })
      }

      // Compute a SHA256 hash of the received fingerprint in cookie in order to compare
      // it to the fingerprint hash stored in the token
      const fingerprintCookieHash = sha256(fingerprintCookie)
      console.log({
        fingerprintCookie,
        fingerprintCookieHash,
        fingerPrintHash,
      })

      if (fingerPrintHash != fingerprintCookieHash) {
        return res.status(401).json({ error: "invalid signature" })
      }

      // check User's refreshToken validity
      const user = await prisma.session.findFirst({
        where: {
          refreshToken,
        },
      })
      if (!user) return res.status(400).json({ error: "refreshToken expired" })

      // Re-New refresh token
      await prisma.session.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: uuidv4(),
          refreshTokenExpiresAt: new Date(
            Date.now() + refreshTokenTtl
          ).toISOString(),
        },
      })
      const jwt = SignWithUserClaims(user)

      return res.status(200).json({
        data: {
          jwt, // we are not sending refreshToken again (one time refresh only)
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
