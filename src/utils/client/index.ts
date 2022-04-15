export const groupBy = (arr: Array<any>, by: string) => {
  return arr.reduce((acc, curr) => {
    const key = curr[by]
    if (!key) throw new Error("key not found")
    if (!acc[key]) acc[key] = []
    acc[key].push(curr)
    return acc
  }, {})
}
