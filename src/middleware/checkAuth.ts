import { NextApiRequest } from "next/types";
import { getUserFromAuthToken } from "~/utils/api";
import { ClientError } from "~/utils/api/error";

export default function checkAuth(req: NextApiRequest) {
  const loggedUser = getUserFromAuthToken(req);

  if (!loggedUser) {
    throw new ClientError("Auth required", 401);
  }
  return loggedUser;
}
