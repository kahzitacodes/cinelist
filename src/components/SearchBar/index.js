import { useEffect, useState } from "react";
import axios from "axios";
import style from "./style.module.css";
import { CardForm } from "../CardForm";


export function SearchBar(props) {

   const { addMovieAction, removeMovieAction, moviesToDisplay } = props;
   const [searchInput, setSearchInput] = useState("");
   const [movies, setMovies] = useState([]);
   const [open, setOpen] = useState(false);

   const apiKey = "24e1069de660c324728bbf37a36d24bd";


   const handleSearch = (e) => {
      setSearchInput(e.target.value);
   };

   const addMovie = (movie) => {
      addMovieAction(movie);
      setOpen(false);
   };

   const removeMovie = (movieId) => {
      removeMovieAction(movieId);
      setOpen(false);
   };


   useEffect(() => {
      async function fetchMovies() {

         try {
            if (searchInput) {

               let response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}&language=pt-BR&page=1&include_adult=false`);
               
               const moviesWithAddState = response.data.results.map((currentElement) => {
                  for (let i = 0; i < moviesToDisplay.length; i++) {
                     if (moviesToDisplay[i].original_title === currentElement.original_title) {
                        return { ...currentElement, isAdd: true };
                     }
                  }
                  return { ...currentElement, isAdd: false };
               });

               setMovies(moviesWithAddState);
            }
         }
         catch (error) {
            console.log();
         }
      }
      fetchMovies();
   }, [searchInput]);


   useEffect(() => {

      if (searchInput !== "") {
         setOpen(true);
      }
      else {
         setOpen(false);
      }
   }, [searchInput]);


   return (
      <>
         <h2> Selecione os títulos da lista </h2>
         <div className="form-control" style={{ position: "relative" }}>
            <label htmlFor="input-search">Busque por algum título</label>
            <input
               className="form-item"
               id="input-search"
               type="text"
               name="search"
               onChange={handleSearch}
               placeholder="ex: senhor dos anéis"
            />

            {!open ? null :
               (
                  <div className={style.dropdown}>

                     <ul className={style.dropdownUl}>
                        {movies.map((currentElement) => {
                           console.log(currentElement.isAdd);
                           return (
                              <li className={style.dropdownLi} key={currentElement.id}>
                                 <strong>{currentElement.title} </strong>
                                 
                                 {currentElement.isAdd ? <button type="button" className={style.btnDropdownDel} onClick={() => {
                                    removeMovie(currentElement.id);
                                 }}>Deletar</button> : <button type="button" className={style.btnDropdownAdd} onClick={() => {
                                    addMovie(currentElement);
                                 }}>Adicionar</button>}
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               )}


            <div className={style.cardsDisplay}>
               {moviesToDisplay.map((addedMovie) => {
                  return (
                     <CardForm
                        key={addedMovie.id}
                        removeMovie={removeMovie}
                        movieId={addedMovie.id}
                        imagePath={addedMovie.poster_path}
                        movieTitle={addedMovie.title}
                        movieDate={addedMovie.release_date}
                        movieOverview={addedMovie.overview}
                     />
                  );
               })}
            </div>
         </div>
      </>
   );
};