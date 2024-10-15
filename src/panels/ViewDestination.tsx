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
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: destination,
              client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, // Read API key from environment variables
              per_page: 1,
              orientation: "landscape",
            },
          }
        );

        if (response.data.results.length > 0) {
          setImageUrl(response.data.results[0].urls.regular);
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
