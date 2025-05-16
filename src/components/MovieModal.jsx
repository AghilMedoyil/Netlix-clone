import React, { useEffect, useState } from "react";
import { createImageUrl } from "../services/movieServices";
import axios from "axios";
import { key,baseUrl } from "../services/movieServices";




const MovieModal = ({ movie, onClose }) => {
  
  
  const [trailerKey, setTrailerKey] = useState(null);
  

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/movie/${movie.id}/videos?api_key=${key}`
        );
        console.log(res)
        

        const trailers = res.data.results;
        const youtubeTrailer = trailers.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (youtubeTrailer) setTrailerKey(youtubeTrailer.key);
      } catch (err) {
        console.error("Trailer fetch error:", err);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <>
  
    <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden relative">
        <button
          className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded"
          onClick={onClose}
        >
          Close
        </button>

        <img
          src={createImageUrl(movie.backdrop_path || movie.poster_path, "w780")}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-700 mb-4 break-words whitespace-normal leading-relaxed">{movie.overview}</p>

          {trailerKey ? (
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
            >
              ▶ Play Trailer
            </a>
          ) : (
            <p className="text-black">No trailer available.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default MovieModal;
