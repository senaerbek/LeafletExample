import React, { useEffect, useState } from "react";
import data from "../Countries/countries.json";
import { MapContainer, GeoJSON } from "react-leaflet";

function WorldMap() {
  const [country, setCountry] = useState([]);
  const [showCountry, setShowCountry] = useState("");

  useEffect(() => {
    setCountry(data);
  }, []);

  function CountryLoop(feature, layer) {
    layer.bindPopup(feature.properties.ADMIN + "/" + feature.properties.ISO_A3);
    layer.on({
      click: (e) => {
        setShowCountry(e.target.feature.properties.ADMIN);
      },
    });
  }
  return (
    <div className="container">
      {showCountry.length === 0 ? (
        <div>
          {" "}
          <h1>WORLD MAP</h1>{" "}
        </div>
      ) : (
        <h1>WORLD MAP / {showCountry}</h1>
      )}

      <MapContainer
        center={[0, 0]}
        style={{ height: "600px", width: "1000px" }}
        zoom={2}
        maxZoom={4}
        minZoom={2}
        scrollWheelZoom={true}
      >
        <GeoJSON data={country.features} onEachFeature={CountryLoop} />
      </MapContainer>
    </div>
  );
}

export default WorldMap;
