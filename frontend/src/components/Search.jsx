import { React, useState } from "react";

export default function Search() {
    const [movie, setMovie] = useState();
    const [inputText, setInputText] = useState("");

    //  function to get movies data from api
    const getData = () => {
      console.log("input text", inputText)
      fetch(`http://www.omdbapi.com/?t=${inputText}&apikey=536459e3`)
        .then((res) => res.json())
        .then((data) => setMovie(data));
    };
  
    console.log("movie data", movie)
  
    return (
      <div className="search-container">
        <h1>Movies</h1>
          <input
              name="movieName"
              className="search"
              type="text"
              value={inputText}
              placeholder="search movie title..."
              onChange={(e) => setInputText(e.target.value)}
          />
        <button onClick={()=> getData(inputText)}>Search</button>
        {movie &&
          <div className="movie-section">
            <img src={movie.Poster} alt="Movie Poster" height="250" width="150" />
            <h2>{movie.Title}</h2>
            <h4>{movie.Year}</h4>
            <button>Click</button>
          </div>
        }
      </div>
    );
}
