import { ChangeEvent, useEffect, useState } from "react";

function useSearchFn<T extends Record<string, any>>(data: T[]) {
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        typeof val === "string" && val.toLowerCase().includes(searchValue)
      )
    );

    setFilteredData(filtered);
  };

  return {
    filteredData,
    handleSearch,
  };
}

export default useSearchFn;
