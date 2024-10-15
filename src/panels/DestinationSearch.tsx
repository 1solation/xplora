import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DestinationSearchProps {
  onGoClick: (value: string) => void;
}

function DestinationSearch({ onGoClick }: DestinationSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (inputRef.current) {
        console.log("Initializing Google Maps Autocomplete...");
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["(cities)"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place && place.formatted_address) {
            console.log("Place selected:", place.formatted_address);
            setInputValue(place.formatted_address);
          }
        });
      }
    };

    if (window.google) {
      loadGoogleMaps();
    } else {
      const intervalId = setInterval(() => {
        if (window.google) {
          clearInterval(intervalId);
          loadGoogleMaps();
        }
      }, 100);
    }
  }, []);

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
        <Input
          type="text"
          placeholder="Enter a city or town"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="secondary" onClick={handleClick}>
          Go
        </Button>
      </div>
    </div>
  );
}

export default DestinationSearch;
