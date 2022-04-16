export const groupBy = (arr: Array<any>, by: string) => {
  return arr.reduce((acc, curr) => {
    const key = curr[by]
    if (!key) throw new Error("key not found")
    if (!acc[key]) acc[key] = []
    acc[key].push(curr)
    return acc
  }, {})
}

export function debounce<T extends Function>(cb: T, wait = 20) {
  let h: NodeJS.Timeout
  let callable = (...args: any) => {
    clearTimeout(h)
    h = setTimeout(() => cb(...args), wait)
  }
  return <T>(<any>callable)
}
