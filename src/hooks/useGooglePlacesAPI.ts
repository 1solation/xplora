import { useEffect, useRef } from "react";

interface UseGooglePlacesAPIProps {
  apiKey: string;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  libraries: string[];
  inputAutocompleteValue: string;
  options: google.maps.places.AutocompleteOptions;
  language?: string;
}

export const useGooglePlacesAPI = ({
  apiKey,
  onPlaceSelected,
  libraries,
  options,
  language,
}: UseGooglePlacesAPIProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadScript = () => {
      if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(
          ","
        )}&language=${language || "en"}`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeAutocomplete();
        document.head.appendChild(script);
      } else {
        if (window.google) {
          initializeAutocomplete();
        } else {
          const existingScript = document.querySelector(
            `script[src*="maps.googleapis.com"]`
          );
          existingScript?.addEventListener("load", initializeAutocomplete);
        }
      }
    };

    const initializeAutocomplete = () => {
      if (inputRef.current && window.google) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          options
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          onPlaceSelected(place);
        });
      }
    };

    if (!window.google) {
      loadScript();
    } else {
      initializeAutocomplete();
    }
  }, [apiKey, libraries, options, onPlaceSelected, language]);

  return { ref: inputRef };
};
