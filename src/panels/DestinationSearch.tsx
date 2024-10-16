import React, { useState } from "react";
import MapWrapper from "@/components/MapWrapper";
import SearchBar from "@/components/SearchBar";

interface DestinationSearchProps {
  onGoClick: (value: string) => void;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({ onGoClick }) => {
  const [inputValue, setInputValue] = useState("");
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [zoom, setZoom] = useState(2);

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    if (
      place &&
      place.formatted_address &&
      place.geometry &&
      place.geometry.location
    ) {
      const formattedAddress = place.formatted_address;
      setInputValue(formattedAddress);
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setZoom(12);
      onGoClick(formattedAddress); // Call onGoClick directly when a place is selected
    }
  };

  return (
    <div className="panel">
      <h2>Enter a city to get started</h2>
      <div className="input-button-container">
        <SearchBar
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={handlePlaceSelected}
          libraries={["places"]}
          inputAutocompleteValue={inputValue}
          options={{ types: ["(cities)"] }}
        />
      </div>
      {center && (
        <MapWrapper
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          center={center}
          zoom={zoom}
          onLoad={() => {}}
        />
      )}
    </div>
  );
};

export default DestinationSearch;
