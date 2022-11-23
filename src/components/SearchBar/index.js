import { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import debounce from "lodash.debounce";
import style from "./style.module.css";


export function SearchBar(props) {
   const { addMovieAction, removeMovieAction, moviesToDisplay } = props;
   const [searchInput, setSearchInput] = useState("");
   const [movies, setMovies] = useState([]);
  // const [moviesToAdd, setMoviesToAdd] = useState([]);
   const [open, setOpen] = useState(false);
   const [toggleButton, setToggleButton] = useState(true);




   const apiKey = "24e1069de660c324728bbf37a36d24bd";

   const handleSearch = (e) => {
      setSearchInput(e.target.value);
   };

   // toggle buttons to add or remove movie from list
   // const handleToggle = () => {
   //    setToggle(!toggle);
   // };

   // Set a 'delay' before evoking the handleSearch function  
   const debouncedHandleSearch = useMemo(() => {
      console.log(searchInput);
      return debounce(handleSearch, 300);
   }, []);

   const handleButtonChange = () => {
         setToggleButton(!toggleButton)
   }

   const addMovie = (movie) => {
     // setMoviesToAdd([...moviesToAdd, movie]);
     addMovieAction(movie)

      handleButtonChange()
      

      setOpen(false);
      setSearchInput("");
   };

   // const removeMovie = (movieId) => {
   //    const filteredMovies = moviesToAdd.filter((currentElement) => currentElement.id !== movieId);
   //    handleButtonChange();
   //    setMoviesToAdd(filteredMovies);
   // };



   // Search on type
   useEffect(() => {
      async function fetchMovies() {

         try {
            if (!searchInput) {
               return;
            }

            let response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}&language=pt-BR&page=1&include_adult=false`);

            setMovies(response.data.results);
            setOpen(true);

         } catch (error) {
            console.log();
         }
      }
      fetchMovies();

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
               onChange={debouncedHandleSearch}
               placeholder="ex: senhor dos anéis"
            />

            {/* dropdown that display search results in a list */}
            {!open ? null :
               (
                  <div className={style.dropdown}>

                     <ul className={style.dropdownUl}>
                        {movies.map((currentElement) => {

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
                                    <button className={moviesToDisplay.includes(currentElement) ? style.toggleTwo : style.toggleOne} type="button" onClick={() => {

                                    moviesToDisplay.includes(currentElement) ? removeMovieAction(currentElement.id) : addMovie(currentElement)

                                    }}> + </button> 
                                 
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               )}

            {/* display cards added to array/form */}
            <div style={{ marginTop: 20, display: "flex", gap: 24, flexDirection: "column" }}>
               {moviesToDisplay.map((addedMovie) => {
                  return (
                     <div key={addedMovie.id} style={{
                        display: "flex", position: "relative", border: "1px solid #dddd", borderRadius: "15px", overflow: "hidden"
                     }}>
                        <button style={{ position: "absolute", top: 10, right: 10 }} type="button">✅</button>
                        <img height={241} src={`https://image.tmdb.org/t/p/w500/${addedMovie.poster_path}`} alt={addedMovie.title} />
                        <div style={{ padding: 16 }}>
                           <h3>{addedMovie.title}</h3>
                           <p>{new Date(addedMovie.release_date).getFullYear()}</p>
                           <p>{addedMovie.overview}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </>
   );
}