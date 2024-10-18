import { useState, useRef, useEffect } from "react";
import "./globals.css";
import xploraLogo from "./assets/xplora-no-bg.png";
import DestinationSearch from "./panels/DestinationSearch";
import ViewDestination from "./panels/ViewDestination";
import { AlertComponent } from "./utils/alert";

function App() {
  const [showViewDestination, setShowViewDestination] = useState(false);
  const [destination, setDestination] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef1 = useRef<HTMLDivElement | null>(null);
  const containerRef2 = useRef<HTMLDivElement | null>(null);
  const containerRef3 = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentContainerRef1 = containerRef1.current;
    const currentContainerRef2 = containerRef2.current;
    const currentContainerRef3 = containerRef3.current;

    if (currentContainerRef1) observer.observe(currentContainerRef1);
    if (currentContainerRef2) observer.observe(currentContainerRef2);
    if (currentContainerRef3) observer.observe(currentContainerRef3);

    return () => {
      if (currentContainerRef1) observer.unobserve(currentContainerRef1);
      if (currentContainerRef2) observer.unobserve(currentContainerRef2);
      if (currentContainerRef3) observer.unobserve(currentContainerRef3);
    };
  }, []);

  return (
    <>
      <div ref={containerRef1} className="container fade-in">
        <img src={xploraLogo} className="logo" alt="Xplora logo" />
        <p>Your AI Travel Assistant</p>
      </div>
      <div ref={containerRef2} className="container fade-in">
        <DestinationSearch onGoClick={handleGoClick} />
      </div>
      {errorMessage && (
        <div ref={containerRef3} className="container fade-in">
          <AlertComponent message={errorMessage} />
        </div>
      )}
      {showViewDestination && (
        <div ref={containerRef3} className="container fade-in">
          <ViewDestination destination={destination} />
        </div>
      )}
    </>
  );
}

export default App;
