export function countByKey(items: any[], key: string) {
  const map: Record<string, number> = {};

  for (const item of items) {
    const value = String(item[key]);

    if (!map[value]) {
      map[value] = 1;
    } else {
      map[value]++;
    }
  }

  return Object.keys(map).map((value) => ({
    [key]: value,
    amount: map[value],
  }));
}
