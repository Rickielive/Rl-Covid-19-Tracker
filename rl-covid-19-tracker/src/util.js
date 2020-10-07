import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColor = {
  cases: {
    hex: "#CC1034",
    // rgb: "rgb (204,16,52)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    // rgb: "rgb (125,215,29)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    // rgb: "rgb (251,68,67)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};
// return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))

//format the infobox
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

// draw circles on the mapwith interactive tooltips
export const showDataOnMap = (data, caseType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColor[caseType].hex}
      fillColor={casesTypeColor[caseType].hex}
      radius={
        Math.sqrt(country[caseType]) * casesTypeColor[caseType].multiplier
      }
    >
      <Popup>
        {/* div>div*5 */}
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
