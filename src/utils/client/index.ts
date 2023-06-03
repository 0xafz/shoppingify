export const groupBy = <T>(arr: Array<T>, by: string) => {
  return arr.reduce((acc, curr) => {
    const key = curr[by];
    if (!key) throw new Error("key not found");
    acc[key] = acc[key] || [];
    acc[key].push(curr);
    return acc;
  }, {} as Record<string, T[]>);
};

export function debounce<T extends Function>(cb: T, wait = 20) {
  let h: NodeJS.Timeout;
  let callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
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
};
export const groupByTime = <T>(
  arr: Array<T>,
  by: string,
  gap: "month" | "year"
): Record<string, T[]> => {
  return arr.reduce((acc, curr) => {
    let dateValue = curr[by];
    if (!dateValue) throw new Error(`property ${by} doesn't exist`);
    dateValue = new Date(dateValue);
    if (!(dateValue instanceof Date))
      throw new Error(`property ${by} is not valid date`);

    const key = getGroupByKeyString(dateValue, gap);
    acc[key] = acc[key] || [];
    acc[key].push(curr);
    return acc;
  }, {});
};
export const getGroupByKeyString = (date: Date, gap: "month" | "year") => {
  switch (gap) {
    case "month":
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    case "year":
      return date.getFullYear().toString();
  }
};

export const unGroup = (obj: Record<string, Array<any>>) => {
  let result = [];
  for (const groupedItemsArr of Object.values(obj)) {
    result = result.concat(groupedItemsArr);
  }
  return result;
};

export const sortObjectByKey = <T>(
  obj: Record<string | number, T>,
  compareFn?: (a: [string, T], b: [string, T]) => number
) => {
  return Object.entries<T>(obj).sort(compareFn);
};
