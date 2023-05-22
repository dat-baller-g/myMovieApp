import React, { useState, useCallback } from 'react';
import './App.css';
import axios from "axios";

//Search for a movie title, app brings in the search results which are looped through and displayed in a div below using the 1st options.
//Click on the particular movie you want and this div is populated by results gotten from the 2nd options.
//useeffect to render result when buttons are clicked.
//when search button is clicked, useeffect should use the 1st options array.
//when select button is clicked, useeffect should use the 2nd options array.

//


function App() {
  const [result, setResult] = useState("")
  const [movieTitle, setMovieTitle] = useState("");
  const [selectedMovieTitle, setSelectedMovieTitle ] = useState("")
  const [movieResult, setMovieResult] = useState("");
  let newValue = "";
  const handleChange = (e) =>{
    e.preventDefault();
    newValue = e.target.value;
    setMovieTitle(newValue)   
  };

  // const handleSubmit = (e) =>{
  //   e.preventDefault();
  //    console.log(movieTitle)
  // }

   //define you app state here
   const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Api request here
    const options = {
      method: 'GET',
      url: 'https://movie-database-alternative.p.rapidapi.com/',
      params: { r: 'json', s: movieTitle, p:"2"},
      headers: {
        'X-RapidAPI-Key': 'f48e281f80msh1f9ba29d8ac28d1p1321fdjsn70916403c71c',
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
    };
     
      axios.request(options).then(function (response) {
        setResult(response.data.Search)
        console.log(result);
      }).catch(function (error) {
        console.error(error);
      });
}, [movieTitle, result]);

const handleClick = useCallback((movie) => {
  // e.preventDefault();
  // Api request here
  const options = {
    method: 'GET',
    url: 'https://movie-database-alternative.p.rapidapi.com/',
    params: { r: 'json', i: movie},
    headers: {
      'X-RapidAPI-Key': 'f48e281f80msh1f9ba29d8ac28d1p1321fdjsn70916403c71c',
      'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }
  };
   
    axios.request(options).then(function (response) {
      setMovieResult(response.data)
      console.log(movieResult);
    }).catch(function (error) {
      console.error(error);
    });
}, [movieResult]);

//  React.useEffect(() => {
//   const options = {
//     method: 'GET',
//     url: 'https://movie-database-alternative.p.rapidapi.com/',
//     params: { r: 'json', s: movieTitle, p:"2"},
//     headers: {
//       'X-RapidAPI-Key': 'f48e281f80msh1f9ba29d8ac28d1p1321fdjsn70916403c71c',
//       'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
//     }
//   };
   
//     axios.request(options).then(function (response) {
//       setResult(response.data)
//       console.log(response.data);
//     }).catch(function (error) {
//       console.error(error);
//     });
   
//  }, [movieTitle, ]);

//  const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'f48e281f80msh1f9ba29d8ac28d1p1321fdjsn70916403c71c',
// 		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
// 	}
// };

// fetch('https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
 










  return (
    <div className="App">
      <h1>My Movie App</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder='Enter movie title' onChange={handleChange}  type="text" name='movTitle'></input>
        <button type='submit'> Submit</button>
      </form>
      {Array.isArray(result) && result.map((movie)=>{
        return(
          <div>
            <p>{movie.Title}</p>
            <img src={movie.Poster}  alt="poster"/>
            <button onClick={()=>{setResult(movie.imdbID); console.log(result); handleClick(movie.imdbID)}}>Select</button>
          </div>
        )
      }) }
      
      <div>
         <p>{movieResult.Title}</p>
        <img src={movieResult.Poster}  alt="poster"/>
        <p>{movieResult.imdbRating}</p>
        <p>{movieResult.BoxOffice}</p>
        <p>{movieResult.Plot}</p>
        <p>{movieResult.Genre}</p>
        <p>{movieResult.Awards}</p>
        <p>{movieResult.Released}</p>
      </div>

      {/* <p>{result.Title}</p>
      <button></button> */}
      
    </div>
  );
}

export default App;
