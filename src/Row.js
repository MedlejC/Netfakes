import React, { useEffect, useState } from "react";
import "./Row.css";
import Axios from "./Axios";

// This is how the Props come in:
// funtion Row(props) {
// Let's de-structure it!
function Row({ title, fetchUrl, isLargeRow = false }) {
  // isLargeRow is false by default, unless we get that prop passed to it

  // Create a variable that will carry all the movies info
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await Axios.get(fetchUrl);
      setMovies(request.data.results);
      return request; // Good practice (similar to Banner.js)
    }
    fetchData();
  }, [fetchUrl]);

  //   console.log(movies)

  const base_url = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* Iterate through the movies and return {something}*/}
        {movies.map(
          (movie) =>
            // Checks (before rendering) for corrupted links - we don't want them

            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                // Good practice: whenever we are rendering multiple things,
                // always pass a key
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
