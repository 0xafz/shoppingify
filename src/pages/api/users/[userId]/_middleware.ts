import { NextApiRequest } from "next/types"
import { getUserFromAuthToken } from "~/utils/api"

export function middleware(req: NextApiRequest) {
  const user = getUserFromAuthToken(req)

  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  })
}
