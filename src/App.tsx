import { useState } from "react";
import "./globals.css";
import xploraLogo from "./assets/xplora-no-bg.png";
import DestinationSearch from "./panels/DestinationSearch";
import ViewDestination from "./panels/ViewDestination";
import { AlertComponent } from "./utils/alert";

function App() {
  const [showViewDestination, setShowViewDestination] = useState(false);
  const [destination, setDestination] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoClick = (value: string) => {
    if (value.trim().length > 0) {
      setDestination(value);
      setShowViewDestination(true);
      setErrorMessage("");
    } else {
      setShowViewDestination(false);
      setErrorMessage("You need to enter a destination.");
    }
  };

  return (
    <>
      <div className="container">
        <img src={xploraLogo} className="logo" alt="Xplora logo" />
        <p>Your AI Travel Assistant</p>
      </div>
      <div className="container">
        <DestinationSearch onGoClick={handleGoClick} />
      </div>
      {errorMessage && <AlertComponent message={errorMessage} />}
      {showViewDestination && (
        <div className="container fade-in">
          <ViewDestination destination={destination} />
        </div>
      )}
    </>
  );
}

export default App;
