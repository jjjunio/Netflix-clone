import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = `https://image.tmdb.org/t/p/original/`;

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

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

  // console.table(movies);

  return (
    //use BEM
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* several row posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
