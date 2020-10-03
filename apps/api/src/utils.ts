export function deepMergeArrayRight(one: any[], two: any[]) {
  const result = [];

  for (let i = 0, l = two.length; i < l; ++i) {
    result.push({
      ...one[i],
      ...two[i],
    });
  }

  return result;
}

export enum Order {
  asc = 'asc',
  dsc = 'dsc',
}

export const arrayOrder = (order: Order, prop: string) => (a: any, b: any) => {
  if (a[prop] > b[prop]) {
    return order === Order.asc ? 1 : -1;
  }

  if (a[prop] < b[prop]) {
    return order === Order.asc ? -1 : 1;
  }

  return 0;
};
