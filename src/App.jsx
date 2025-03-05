import { useState } from 'react'
import './App.css'
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";
import { useEffect } from 'react';

const randomMovieList = ['Bad Boys', 'Iron man', 'Shrek', 'Batman', 'Train to Busan']

const grabRandomMovie = randomMovieList[Math.floor(Math.random() * randomMovieList.length)]

console.log(import.meta.env.VITE_OMDB_API_KEY)

function App() {

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] = useState(true)

  // Function to get movies
  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=${searchTerm}&type=movie`
      );
      const data = await response.json();
      setMovie(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }; 

  useEffect(() => {
   
    getMovie(grabRandomMovie);
  }, []);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
        <Form moviesearch={getMovie} />
        {/* //conditional rendering and ternary conditin */}
        <MovieDisplay movie={movie} />
        </>
      )}
    
    </div>
  );
}

export default App
