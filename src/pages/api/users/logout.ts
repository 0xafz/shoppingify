import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { loginCookieName } from "~/constants";
import { handleError } from "~/utils/api/error";

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
      );
      return res.json({
        data: {
          ok: true,
        },
      });
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    handleError(err, res);
  }
}
