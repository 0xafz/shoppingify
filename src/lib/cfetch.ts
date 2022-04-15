import { getAuthHeaders } from "~/utils/client"

export default async function cfetch(input: RequestInfo, options: RequestInit) {
  const { headers = {}, ...other } = options
  const res = await fetch(input, {
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
      ...headers,
    },
    ...other,
  })
  return await res.json()
}
