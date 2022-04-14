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
  const json = await res.json()

  if (json.data) return json.data
  if (json.error) {
    throw new Error(json.error)
  } else {
    throw new Error("something went wrong!")
  }
}
