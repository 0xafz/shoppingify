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
  if (!res.ok) {
    return {}
  }
  if (outputType === "string") {
    return res.text()
  }
  return await res.json()
}

export async function cfetchPromise<T = unknown>(
  input: RequestInfo,
  options: RequestInit
) {
  const { headers = {}, ...other } = options
  return new Promise<T>(async (resolve, reject) => {
    const response = await fetch(input, {
      credentials: "include",
      headers: {
        "content-type": "application/json",
        ...getAuthHeaders(),
        ...headers,
      },
      ...other,
    })
    if (!response.ok) {
      reject(response.statusText)
    }

    const result = await response.json()

    if (result.data) resolve(result.data as T)
    else if (result.error) reject(result.error)
    else resolve(result)
  })
}
