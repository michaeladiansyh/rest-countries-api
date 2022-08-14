import React, { useEffect } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useCountry } from "../../context/CountryContext";

import "./SearchComponent.css";

function SearchComponent() {
  const { getCountries, handleFilter, filteredData, wordData } = useCountry();

  useEffect(() => {
    getCountries();
  }, []);
  return (
    <div>
      <p className="text-center text-5xl font-bold mt-40 my-5">Country</p>
      <div className="flex m-0 mx-auto w-1/2 rounded-md border-grey-light border ">
        <input
          className="w-full h-10 rounded-md indent-5 focus:outline-purple-700"
          type="search"
          name="search"
          placeholder="Type any country name"
          value={wordData}
          onChange={handleFilter}
        />
        <span className="absolute right-96 flex items-center  pr-5 pt-3">
          <AiOutlineSearch />
        </span>
      </div>
      {filteredData.length != 0 && (
        <div className="mx-auto w-1/2 rounded-md mt-1 shadow-lg">
          {filteredData.slice(0, 5).map((value, key) => {
            return (
              <Link
                to={`/country/${value.name}`}
                state={{ value: value }}
                key={key}
              >
                <p className="pt-3 pl-4 value--search">{value.name}</p>
              </Link>
            );
          })}
        </div>
      )}
      {wordData.length > 0 && (
        <div className="mx-auto w-1/2 rounded-md mt-1 shadow-lg">
          {filteredData.length == 0 && (
            <p className="pt-3 pl-4 text-red-500">Data Not Found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
