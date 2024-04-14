import React, { useEffect, useState } from "react";
import "./Banner.css";
import dummyBanner from "./assets/dummy-banner.png";
import Axios from "./Axios";
import requests from "./Requests";

function Banner() {
    // Truncates the description text when it gets too long.
    // n represents the number of characters I want to display
    // before cutting them off with "..."
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }


    //--------------------------------
    // MOVIE FETCH - themoviedb.org
    //--------------------------------
    // Initialize the movie variable
    const [movie, setMovie] = useState([]);

    // Use useEffect to fetch the movie info
    useEffect(() => {
        async function fetchData(){
            const request = await Axios.get(requests.fetchNetflixOriginals);
            setMovie(
                    // Generate a random number from 0 -> the nb of results received.
                    // Ex: 100 videos received back -> we generate a random nb between 0 and 99
                    // It will set the movie object we have here to the random movie we chose
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request; // Good practice to always do this: completely closes the Promise chain
        }
        fetchData();
    },[])

    console.log(movie)
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
            {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>


      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
