import axios from "axios";
import { createContext, useContext, useState } from "react";

const countryContext = createContext();

export function CountryContextProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [wordData, setWordData] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [isHoveringCall, setIsHoveringCall] = useState(false);
  const [isHoveringCurrency, setIsHoveringCurrency] = useState(false);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      return setCountries(response.data);
    } catch (error) {
      return error;
    }
  };

  const handleFilter = (event) => {
    let text = event.target.value;
    setWordData(text);
    let matches = countries.filter((country) => {
      const regex = new RegExp(`${text}`, "gi");

      return country.name.match(regex);
    });
    if (text === "") {
      setFilteredData([]);
    } else {
      setFilteredData(matches);
    }
  };

  const handleMouseOverCall = () => {
    setIsHoveringCall(true);
  };
  const handleMouseOverCurrency = () => {
    setIsHoveringCurrency(true);
  };

  const handleMouseOutCall = () => {
    setIsHoveringCall(false);
  };
  const handleMouseOutCurrency = () => {
    setIsHoveringCurrency(false);
  };

  const value = {
    countries,
    getCountries,
    handleFilter,
    filteredData,
    handleMouseOverCurrency,
    handleMouseOverCall,
    handleMouseOutCurrency,
    handleMouseOutCall,
    isHoveringCall,
    isHoveringCurrency,
    wordData,
  };

  return (
    <countryContext.Provider value={value}>{children}</countryContext.Provider>
  );
}

export function useCountry() {
  return useContext(countryContext);
}
