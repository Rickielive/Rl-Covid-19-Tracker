import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  // STATE = how to write a variable in React
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  //USEEFFECT = runs a piece of code based on agiven condition
  useEffect(() => {
    //async => send a request, wait for an infor, do something with the infor
    //write an internal function
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("Yooooooo ", countryCode);

    setCountry(countryCode);
  };

  return (
    <div className="app">
      {/* BEM naming convention */}
      {/* Header */}
      {/* Title + Select input dropdown field  */}
      {/* div.app__header */}

      {/* Left Container */}
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropDown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all the countries and show a list of the options */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

              {/* <MenuItem value="worldwide">Kenya</MenuItem>
            <MenuItem value="worldwide">South Africa</MenuItem>
            <MenuItem value="worldwide">Nigeria</MenuItem>
            <MenuItem value="worldwide">Egypt</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* Infobox Coronavirus Cases */}
          <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
          {/* Infobox Coronavirus Recoveries */}
          <InfoBox title="Recovered" cases={124} total={4000} />
          {/* Infobox Coronavirus Deaths */}
          <InfoBox title="Deaths" cases={127} total={3000} />
        </div>
        {/* Map */}
        <Map />
      </div>

      {/* Right Container */}
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases By Country</h3>
          {/* Graph */}
          <h3>Worldwide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
