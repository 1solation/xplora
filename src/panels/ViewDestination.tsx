import { useEffect, useState } from "react";

interface ViewDestinationProps {
  destination: string;
}

function ViewDestination({ destination }: ViewDestinationProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        fetchPlacePhoto();
      };
      document.head.appendChild(script);
    };

    const fetchPlacePhoto = () => {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        query: destination,
        fields: ["photos"],
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results &&
          results[0]
        ) {
          const place = results[0];
          if (place.photos && place.photos.length > 0) {
            const photoUrl = place.photos[0].getUrl({ maxWidth: 800 });
            setImageUrl(photoUrl);
          } else {
            setImageUrl(null);
          }
        } else {
          console.error("Place not found or error occurred: " + status);
          setImageUrl(null);
        }
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      fetchPlacePhoto();
    }
  }, [destination]);

  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h2>Destination Details</h2>
      <p>You're going to {destination}!</p>
      <div
        className="image-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={destination}
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
    </div>
  );
}

export default ViewDestination;
