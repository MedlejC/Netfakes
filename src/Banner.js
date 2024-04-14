import React from "react";
import "./Banner.css";
import dummyBanner from "./assets/dummy-banner.png";

function Banner() {
    // Truncates the description text when it gets too long.
    // n represents the number of characters I want to display
    // before cutting them off with "..."
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n-1) + '...' : string
    }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${dummyBanner})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">Movie Name</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porttitor placerat. Ut enim nunc, hendrerit a congue sit amet, commodo at justo. Ut rutrum tellus sit amet fermentum hendrerit. Mauris molestie dolor eu neque consequat, sit amet mollis mauris feugiat. Mauris feugiat, sem vel posuere elementum, purus libero blandit leo, et pretium nisi arcu sollicitudin risus. Duis efficitur tortor nec sem consectetur, id fermentum mi malesuada. Mauris vel pulvinar neque. Praesent lorem purus, pellentesque nec rhoncus at, aliquam a diam. Suspendisse laoreet sapien orci, quis bibendum lectus dapibus sed. Suspendisse potenti.`, 150)}</h1>
      </div>
      

      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
