import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DestinationSearchProps {
  onGoClick: (value: string) => void;
}

function DestinationSearch({ onGoClick }: DestinationSearchProps) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    onGoClick(inputValue);
  };

  return (
    <div className="panel">
      <h2>Where are you going?</h2>
      <div className="input-button-container">
        <Input
          type="text"
          placeholder="Enter a city or town"
          onChange={handleChange}
        />
        <Button variant="secondary" onClick={handleClick}>
          Go
        </Button>
      </div>
    </div>
  );
}

export default DestinationSearch;
