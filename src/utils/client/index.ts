export const groupBy = (arr: Array<any>, by: string) => {
  return arr.reduce((acc, curr) => {
    const key = curr[by]
    if (!key) throw new Error("key not found")
    acc[key] = acc[key] || []
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

const months = {
  0: "January",
  1: "Febraury",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
}
export const groupByTime = <T>(
  arr: Array<T>,
  by: string,
  gap: "month" | "year"
) => {
  return Object.entries<T[]>(
    arr.reduce((acc, curr) => {
      let dateValue = curr[by]
      if (!dateValue) throw new Error(`property ${by} doesn't exist`)
      dateValue = new Date(dateValue)
      if (!(dateValue instanceof Date))
        throw new Error(`property ${by} is not valid date`)

      let key
      switch (gap) {
        case "month":
          key = `${months[dateValue.getMonth()]} ${dateValue.getFullYear()}`
          break
        case "year":
          key = dateValue.getFullYear()
          break
      }
      acc[key] = acc[key] || []
      acc[key].push(curr)
      return acc
    }, {})
  ).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
}

export const unGroup = (obj: Record<string, Array<any>>) => {
  let result = []
  for (const groupedItemsArr of Object.values(obj)) {
    result = result.concat(groupedItemsArr)
  }
  return result
}
