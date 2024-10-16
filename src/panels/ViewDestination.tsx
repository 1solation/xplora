import { useEffect, useState } from "react";
import axios from "axios";
import { capitaliseFirstLetter } from "@/utils/capitaliseFirst";

interface ViewDestinationProps {
  destination: string;
}

function ViewDestination({ destination }: ViewDestinationProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
          {
            params: {
              input: destination,
              inputtype: "textquery",
              fields: "photos",
              key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            },
          }
        );

        if (response.data.candidates.length > 0) {
          const photoReference =
            response.data.candidates[0].photos[0].photo_reference;
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          }`;
          setImageUrl(photoUrl);
        } else {
          setImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [destination]);

  return (
    <div className="panel">
      <h2>Destination Details</h2>
      <p>You're going to {capitaliseFirstLetter(destination)}!</p>
      <div className="input-button-container">
        <div className="image-container">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={destination}
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </div>
      {imageUrl && (
        <div className="button-container">
          <button className="fade-in-button">Explore More</button>
        </div>
      )}
    </div>
  );
}

export default ViewDestination;
