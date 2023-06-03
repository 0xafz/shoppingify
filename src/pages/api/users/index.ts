import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { loginCookieAge, loginCookieName, refreshTokenTtl } from "~/constants";
import prisma from "~/lib/prisma";
import { setHardCookie } from "~/utils/api";
import {
  hashPassword,
  md5,
  SignWithUserClaims,
  uuidv4,
} from "~/utils/api/crypto";
import { handleError } from "~/utils/api/error";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        const { email, password, name } = req.body;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (user) {
          res.status(400).json({ error: "User already exists" });
          return;
        }
        const refreshToken = uuidv4();
        const newUser = await prisma.user.create({
          data: {
            name,
            avatar: `https://secure.gravatar.com/avatar/${md5(
              email
            )}?s=164&d=identicon`,
            email,
            createdAt: new Date().toISOString(),
            password: await hashPassword(password),
            session: {
              create: {
                refreshToken: refreshToken,
                refreshTokenExpiresAt: new Date(
                  Date.now() + refreshTokenTtl
                ).toISOString(),
              },
            },
          },
        });

        // Generate a random string that will constitute the fingerprint for this user
        const fingerprint = crypto.randomBytes(50).toString("hex");
        // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
        // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
        setHardCookie(loginCookieName, fingerprint, res, {
          maxAge: loginCookieAge,
        });
        const jwt = SignWithUserClaims(newUser, fingerprint);

        return res.status(200).json({ data: { jwt, refreshToken } });
      }
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    handleError(error, res);
  }
}
