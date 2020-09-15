import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = `https://image.tmdb.org/t/p/original/`;

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //a snipet of code which runs on based on specific conditional variable

  useEffect(() => {
    //if [], run once when the row loads and don't run again
    async function fetchData() {
      //any variable that is pulled in from outside of (the block) useEffect must be a placed as a dependency
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //[] is dependency

  // react-youtube options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // console.log("This is the movie", movie);
    let movieReleaseYear = parseInt(movie.release_date?.substring(0, 4) || "");
    let seriesAirYear = parseInt(movie.first_air_date?.substring(0, 4) || "");

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      //find youtube trailer for movie

      movieTrailer(
        movie?.name || movie?.title,
        movieReleaseYear || seriesAirYear
      )
        .then((url) => {
          // https://www.youtube.com/watch?v=${videoId}
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(url);
          setTrailerUrl(urlParams.get("v")); //videoId
        })
        .catch((error) => console.log(error));
    }
  };

  // console.table(movies);

  return (
    //use BEM
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie?.name || movie?.title}
            year={movie?.first_air_date || movie?.release_date}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
