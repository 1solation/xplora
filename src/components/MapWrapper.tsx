import React, { useEffect, useRef } from "react";

interface MapWrapperProps {
  apiKey: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  onLoad: () => void;
}

const MapWrapper: React.FC<MapWrapperProps> = ({
  apiKey,
  center,
  zoom,
  onLoad,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
        });
        onLoad();
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      document.head.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, [apiKey, center, zoom, onLoad]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
};

export default MapWrapper;
