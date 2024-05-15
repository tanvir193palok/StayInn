"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterByPriceRange = () => {
  const [query, setQuery] = useState([]);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const checked = e.target.checked;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      const filteredQuery = query.filter((item) => item !== name);
      setQuery(filteredQuery);
    }
  };

  useEffect(() => {
    const selectedRange = params.get("range");

    if (selectedRange) {
      const decodedRange = decodeURI(selectedRange);
      const queryInRange = decodedRange.split("|");
      setQuery(queryInRange);
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      params.set("range", encodeURI(query.join("|")));
    } else {
      params.delete("range");
    }

    replace(`${pathName}?${params.toString()}`);
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label for="range1">
          <input
            type="checkbox"
            name="1000-2000"
            id="range1"
            checked={query.includes("1000-2000")}
            onChange={handleChange}
          />
          $ 1000 - $ 2000
        </label>

        <label for="range2">
          <input
            type="checkbox"
            name="2000-2500"
            id="range2"
            checked={query.includes("2000-2500")}
            onChange={handleChange}
          />
          $ 2000 - $ 2500
        </label>

        <label for="range3">
          <input
            type="checkbox"
            name="2500-3000"
            id="range3"
            checked={query.includes("2500-3000")}
            onChange={handleChange}
          />
          $ 2500 - $ 3000
        </label>

        <label for="range3">
          <input
            type="checkbox"
            name="3000-3500"
            id="range3"
            checked={query.includes("3000-3500")}
            onChange={handleChange}
          />
          $ 3000 - $ 3500
        </label>

        <label for="range4">
          <input
            type="checkbox"
            name="3500-4000"
            id="range4"
            checked={query.includes("3500-4000")}
            onChange={handleChange}
          />
          $ 3500 - $ 4000
        </label>

        <label for="range5">
          <input
            type="checkbox"
            name="4000-5000"
            id="range5"
            checked={query.includes("4000-5000")}
            onChange={handleChange}
          />
          $ 4000 - $ 5000
        </label>
      </form>
    </div>
  );
};

export default FilterByPriceRange;
