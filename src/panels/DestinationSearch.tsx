import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
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
      setInputValue(place.formatted_address);
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setZoom(12);
    }
  };

  const handleClick = () => {
    if (inputValue.trim().length > 0) {
      onGoClick(inputValue);
    } else {
      alert("Please enter a valid location.");
    }
  };

  return (
    <div className="panel">
      <h2>Where are you going?</h2>
      <div className="input-button-container">
        <SearchBar
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          onPlaceSelected={handlePlaceSelected}
          libraries={["places"]}
          inputAutocompleteValue={inputValue}
          options={{ types: ["(cities)"] }}
        />
        <Button variant="secondary" onClick={handleClick}>
          Go
        </Button>
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
