export function getJwtToken() {
  return sessionStorage.getItem("jwt")
}
export function getRefreshToken() {
  return sessionStorage.getItem("refreshToken")
}
export function setJwtToken(token: string) {
  sessionStorage.setItem("jwt", token)
}

export function setRefreshToken(token: string) {
  sessionStorage.setItem("refreshToken", token)
}

export function removeJwtTokens() {
  localStorage.removeItem("jwt")
  localStorage.removeItem("refreshToken")
}

export function getAuthHeaders() {
  const headers: HeadersInit = {}
  const token = getJwtToken()

  if (token) headers["authorization"] = `Bearer ${token}`
  return headers
}
export const getAuthFetchOptions = (): RequestInit => {
  return {
    // credentials: "include" is REQUIRED for cookies to work
    credentials: "include",
    headers: {
      ...getAuthHeaders(),
    },
  }
}
