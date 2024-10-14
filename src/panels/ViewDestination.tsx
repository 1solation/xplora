import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ViewDestinationProps {
  destination: string;
}

function ViewDestination({ destination }: ViewDestinationProps) {
  return (
    <div className="panel">
      <h2>Destination Details</h2>
      <div className="input-button-container">
        <p>{destination}</p>
      </div>
    </div>
  );
}

export default ViewDestination;
