import { NextApiRequest, NextApiResponse } from "next";
import { CookieSerializeOptions, serialize } from "cookie";
import { DecodedUser } from "~/types";
import tokenGenerator from "./TokenGenerator";
import { generalCookieAge, isProd, jwtClaimsPropKey } from "~/constants";

export const getUserFromAuthToken = (
  req: NextApiRequest
): DecodedUser | null => {
  try {
    const rawToken = req.headers["authorization"] || "";
    const token = rawToken.split(" ")[1];
    const decoded: any = tokenGenerator.verify(token);
    const claims = decoded[jwtClaimsPropKey];

    return {
      id: Number(claims["X-Auth-User-Id"]),
      ...claims,
    };
  } catch (err) {
    return null;
  }
};

export const getCookie = (cookieStr: string | undefined, key: string) => {
  const cookie = cookieStr
    ?.split(";")
    .filter((x) => x.trim().split("=")[0] === key)[0];
  if (!cookie) {
    return "";
  }
  return cookie.split("=")[1];
};

export function setHardCookie(
  name: string,
  value: string,
  res: NextApiResponse,
  options?: CookieSerializeOptions
) {
  res.setHeader(
    "Set-Cookie",
    serialize(name, value, {
      path: "/",
      httpOnly: true,
      maxAge: options?.maxAge || generalCookieAge,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      ...options,
    })
  );
}
