import React from "react";
import PropTypes from "prop-types";
import { useGooglePlacesAPI } from "@/hooks/useGooglePlacesAPI";

const inputStyle = {
  input: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    height: "3rem",
    fontSize: "24px",
  },
};

const SearchBar = (props: any) => {
  const {
    apiKey,
    onPlaceSelected,
    libraries,
    inputAutocompleteValue,
    options,
    language,
    ...rest
  } = props;

  const { ref } = useGooglePlacesAPI({
    apiKey,
    onPlaceSelected,
    libraries,
    inputAutocompleteValue,
    options,
    language,
  });

  return (
    <input
      id="autocomplete-text-box"
      style={inputStyle.input}
      placeholder="Search any location"
      ref={ref}
      {...rest}
    />
  );
};

SearchBar.propTypes = {
  apiKey: PropTypes.string.isRequired,
  onPlaceSelected: PropTypes.func.isRequired,
  libraries: PropTypes.arrayOf(PropTypes.string).isRequired,
  inputAutocompleteValue: PropTypes.string.isRequired,
  options: PropTypes.object,
  language: PropTypes.string,
};

export default SearchBar;