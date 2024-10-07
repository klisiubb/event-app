import { useEffect, useState } from "react";

export function useFilter<T>(
  items: T[],
  searchTerm: string,
  filterKeys: (keyof T)[]
): T[] {
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = items.filter((item) =>
      filterKeys.some((key) => {
        const value = item[key];
        return typeof value === "string" && value.toLowerCase().includes(term);
      })
    );

    setFilteredItems(filtered);
  }, [searchTerm, items, filterKeys]);

  return filteredItems;
}
