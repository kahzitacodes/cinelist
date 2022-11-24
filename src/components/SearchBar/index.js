import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import style from "./style.module.css";
import { useLocation } from "react-router-dom";
import { CardForm } from "../CardForm";


export function SearchBar(props) {
   const { addMovieAction, removeMovieAction, moviesToDisplay } = props;
   const [searchInput, setSearchInput] = useState("");
   const [movies, setMovies] = useState([]);

   const [open, setOpen] = useState(false);
   const [toggleButton, setToggleButton] = useState(true);
   const location = useLocation();



   const apiKey = "24e1069de660c324728bbf37a36d24bd";

   const handleSearch = (e) => {
      setSearchInput(e.target.value);
   };

   // toggle buttons to add or remove movie from list
   // const handleToggle = () => {
   //    setToggle(!toggle);
   // };

   // Set a 'delay' before evoking the handleSearch function
   //   const debouncedHandleSearch = useMemo(() => {
   //     console.log(searchInput);
   //     return debounce(handleSearch, 300);
   //   }, []);

   const handleButtonChange = () => {
      setToggleButton(!toggleButton);
   };

   const addMovie = (movie) => {
      // setMoviesToAdd([...moviesToAdd, movie]);
      addMovieAction(movie);

      setOpen(false);
   };

   const removeMovie = (movieId) => {
      removeMovieAction(movieId);
      setOpen(false);
   };



   // Search on type
   useEffect(() => {
      async function fetchMovies() {

         try {


            //if(location.pathname === "/create"){
            if (searchInput) {

               let response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}&language=pt-BR&page=1&include_adult=false`);
               console.log(response.data);

               const moviesWithAddState = response.data.results.map((currentElement) => {

                  for (let i = 0; i < moviesToDisplay.length; i++) {
                     if (moviesToDisplay[i].original_title === currentElement.original_title) {
                        return { ...currentElement, isAdd: true };
                     }
                  }
                  return { ...currentElement, isAdd: false };
               });


               console.log(moviesWithAddState);
               setMovies(moviesWithAddState);
            }
         }
         //   else {
         //    if(searchInput){

         //       let response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}&language=pt-BR&page=1&include_adult=false`);
         //       console.log(response.data)

         //       const moviesWithAddState = response.data.listMovies.map((currentElement) => {

         //          for (let i=0; i <moviesToDisplay.length; i++){
         //             if (moviesToDisplay[i].original_title === currentElement.original_title){
         //                return {...currentElement, isAdd : true}
         //             }
         //          }
         //          return {...currentElement, isAdd : false}
         //       })


         //       console.log(moviesWithAddState);
         //       setMovies(moviesWithAddState);
         //      }
         //   }


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


            {/* dropdown that display search results in a list */}
            {!open ? null :
               (
                  <div className={style.dropdown}>

                     <ul className={style.dropdownUl}>
                        {movies.map((currentElement) => {
                           console.log(currentElement.isAdd);
                           return (
                              <li className={style.dropdownLi} key={currentElement.id}>

                                 <strong>{currentElement.title} </strong>

                                 {/* {toggleButton ?
                                    <button className={style.toggleOne} type="button" onClick={() => {

                                       moviesToAdd.includes(currentElement) ? removeMovie(currentElement) : addMovie(currentElement)

                                    //addMovie(currentElement)
                                    //handleButtonChange(currentElement)
                                    
                                       console.log(currentElement.id)
                                    }}> + </button> 
                                  : <button className={style.toggleTwo} type="button" onClick={() => {

                                  //removeMovie(currentElement.id)
                                  

                                    }}> - </button>} */}

                                 {currentElement.isAdd ? <button onClick={() => {
                                    removeMovie(currentElement.id);
                                 }}>Ja to na lista</button> : <button onClick={() => {
                                    addMovie(currentElement);
                                 }}>Nao tou na lista</button>}

                                 {/* <button className={moviesToDisplay.includes(currentElement) ? style.toggleTwo : style.toggleOne} type="button" onClick={() => {

                                    moviesToDisplay.includes(currentElement) ? removeMovieAction(currentElement.id) : addMovie(currentElement);

                                 }}> + </button> */}

                              </li>
                           );
                        })}
                     </ul>
                  </div>
               )}

            {/* display cards added to array/form */}
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
}
