import { useEffect, useState, useRef } from "react";
import axios from "axios";
import style from "./style.module.css";
import { CardMovie } from "../CardMovie";
import iconClose from "../../images/close.svg";

export function SearchBar(props) {

   const ref = useRef(null);

   const { addMovieAction, removeMovieAction, moviesToDisplay } = props;
   const [searchInput, setSearchInput] = useState("");
   const [movies, setMovies] = useState([]);
   const [open, setOpen] = useState(false);
   const [showClearButton, setShowClearButton] = useState(false);

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

   const clearSearchbar = (e) => {
      e.preventDefault();
      ref.current.value = '';
      setSearchInput("");
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
         setShowClearButton(true);
      }
      else {
         setShowClearButton(false);
         setOpen(false);
      }
   }, [searchInput]);


   return (
      <>
         <h2> Selecione os títulos da lista </h2>
         <div className={`form-control ${style.searchbar}`}>
            <label htmlFor="input-search">Busque por algum título</label>
            <input
               ref={ref}
               className="form-item"
               id="input-search"
               type="text"
               name="search"
               onChange={handleSearch}
               placeholder="ex: senhor dos anéis"
            />
            <button onClick={clearSearchbar} className={`${style.searchbarReset} ${showClearButton ? style.show : style.hide}`} >
               <img src={iconClose} alt="limpar busca" />
               Limpar busca
            </button>

            {!open ? null :
               (
                  <div className={style.dropdown}>

                     <ul className={style.dropdownUl}>
                        {movies.map((currentElement) => {
                           console.log(currentElement.isAdd);
                           return (
                              <li className={style.dropdownLi} key={currentElement.id}>
                                 <strong>{currentElement.title} </strong>

                                 {currentElement.isAdd ?

                                    <button type="button" className={style.btnDropdownDel} onClick={() => { removeMovie(currentElement.id); }}>
                                       Deletar
                                    </button>

                                    :

                                    <button type="button" className={style.btnDropdownAdd} onClick={() => { addMovie(currentElement); }}>
                                       Adicionar
                                    </button>}
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               )}


            <div className={style.cardsDisplay}>
               {moviesToDisplay.map((addedMovie) => {
                  return (
                     <CardMovie
                        key={addedMovie.id}
                        removeMovie={removeMovie}
                        movieId={addedMovie.id}
                        image={addedMovie.poster_path}
                        title={addedMovie.title}
                        releaseDate={addedMovie.release_date}
                        overview={addedMovie.overview}
                     />
                  );
               })}
            </div>
         </div>
      </>
   );
};