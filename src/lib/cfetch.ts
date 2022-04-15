import { getAuthHeaders } from "~/utils/client/auth"

export default async function cfetch(
  input: RequestInfo,
  options: RequestInit & {
    outputType?: "json" | "string"
    contentType?: string
  }
) {
  const { headers = {}, outputType, contentType, ...other } = options
  const res = await fetch(input, {
    credentials: "include",
    headers: {
      "content-type": contentType || "application/json",
      ...getAuthHeaders(),
      ...headers,
    },
    ...other,
  })
  if (outputType === "string") {
    return res
  }
  return await res.json()
}
