import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, caseType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href=" https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* a functio that will loop through all the countries and draw a bunch of circles */}
        {showDataOnMap(countries, caseType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
