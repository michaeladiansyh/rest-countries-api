import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCountry } from "../../context/CountryContext";
import { ArrowLeft } from "akar-icons";
import "./CountryPage.css";
import axios from "axios";
function CountryPage() {
  const location = useLocation();
  const {
    handleMouseOverCurrency,
    handleMouseOverCall,
    handleMouseOutCurrency,
    handleMouseOutCall,
    isHoveringCall,
    isHoveringCurrency,
  } = useCountry();
  const [countCurrency, setCountCurrency] = useState([]);
  const [countCalling, setCountCalling] = useState([]);
  const {
    name,
    flags,
    latlng,
    altSpellings,
    capital,
    region,
    subregion,
    callingCodes,
    currencies,
  } = location.state.value;

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  const curr = currencies.map((i, x) => {
    const { code } = i;
    return code;
  });

  const getCurrency = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/currency/${curr}`
      );
      return setCountCurrency(response.data);
    } catch (error) {
      return error;
    }
  };

  const getCallingCode = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/callingcode/${callingCodes}`
      );
      return setCountCalling(response.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getCurrency();
    getCallingCode();
  }, []);

  return (
    <div className="container">
      <button
        className="flex mt-12 ml-24 w-52 h-12 items-center bg-indigo-600 hover:bg-indigo-800 text-white rounded-full"
        onClick={routeChange}
      >
        <ArrowLeft strokeWidth={2} size={30} className="arrow--left" />
        Back To Homepage
      </button>
      <div className="w-9/12 ml-24 mt-10">
        <div className="flex items-end">
          <p className="text-5xl font-bold">{name}</p>
          <img src={flags.svg} className="w-12 h-8 ml-5"></img>
        </div>
        <div className="flex gap-x-2.5 mt-2">
          {altSpellings.map((i, x) => {
            return (
              <p
                key={x}
                className="bg-emerald-300 px-4 rounded-full text-white"
              >
                {i}
              </p>
            );
          })}
        </div>
        <div className="container flex mt-10 h-36 gap-x-5">
          <div
            className="w-3/6 pl-5 pt-5 lat--globe rounded shadow-md"
            // style={{ backgroundImage: `url(${globe})` }}
          >
            <p className="text-lg font-medium">LatLong</p>
            <p className="text-5xl font-bold text-indigo-600 mr-2 mt-5">
              {latlng.join(", ")}
            </p>
            {/* <img src={globe} className="absolute w-52" /> */}
          </div>
          <div className="w-3/6 pl-14 pt-5 rounded shadow-md">
            <p>
              Capital: <span className="font-bold">{capital}</span>
            </p>
            <p>
              Region: <span className="font-bold">{region}</span>
            </p>
            <p>
              Subregion: <span className="font-bold">{subregion}</span>
            </p>
          </div>
        </div>
        <div className="flex mt-10 gap-x-5">
          <div className="w-3/6 pt-5">
            <p className="text-lg font-medium">Calling Code</p>
            <p className="text-5xl font-bold text-indigo-600 mr-2 mt-2">
              {callingCodes}
            </p>
            <p className="text-sm font-medium">
              <span
                className="underline text-indigo-400 cursor-pointer underline-offset-2"
                onMouseOver={handleMouseOverCall}
                onMouseOut={handleMouseOutCall}
              >
                {countCalling.length <= 1
                  ? `${countCalling.length} Country `
                  : `${countCalling.length} Countries `}
              </span>
              with this calling code
            </p>
            <div className="bg-neutral-600 w-80 rounded-lg pl-3 text-white">
              {isHoveringCall &&
                countCalling.map((i, x) => {
                  return (
                    <p key={x} className="pt-2 pb-2">
                      {i.name}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="w-3/6 pt-5">
            <p className="text-lg font-medium">Currency</p>
            {currencies.map((i, x) => {
              const { code } = i;
              return (
                <p
                  key={x}
                  className="text-5xl font-bold text-indigo-600 mr-2 mt-2"
                >
                  {code}
                </p>
              );
            })}
            <p className="text-sm font-medium">
              <span
                className="underline text-indigo-400 cursor-pointer underline-offset-2"
                onMouseOver={handleMouseOverCurrency}
                onMouseOut={handleMouseOutCurrency}
              >
                {countCurrency.length <= 1
                  ? `${countCurrency.length} Country `
                  : `${countCurrency.length} Countries `}
              </span>
              with this currency
            </p>
            <div className="bg-neutral-600 w-80 rounded-lg pl-3 text-white">
              {isHoveringCurrency &&
                countCurrency.map((i, x) => {
                  return (
                    <p key={x} className="pt-2 pb-2">
                      {i.name}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryPage;
