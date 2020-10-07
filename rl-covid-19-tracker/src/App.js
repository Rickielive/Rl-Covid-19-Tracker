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
import Table from "./Table";
import { prettyPrintStat, sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  // STATE = how to write a variable in React
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
          const sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log("Yooooooo ", countryCode);
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //Gets all the data from country response...
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  console.log("Country Info====>>>", countryInfo);

  return (
    <div className="app">
      {/* BEM naming convention */}
      {/* Header */}
      {/* Title + Select input dropdown field  */}
      {/* div.app__header */}

      {/* Left Container */}
      <div className="app__left">
        <div className="app__header">
          <h1>RICKIELIVE COVID-19 TRACKER</h1>
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
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          {/* Infobox Coronavirus Recoveries */}
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          {/* Infobox Coronavirus Deaths */}
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        {/* Map */}

        <Map
          caseType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      {/* Right Container */}
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />

          {/* Graph */}
          <h3 className="app__graphTitle">Worldwide New {casesType}</h3>
          <LineGraph className="app__graph" caseType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
