import { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import debounce from "lodash.debounce";

export function SearchBar() {
   const [searchInput, setSearchInput] = useState("");
   const [movies, setMovies] = useState([]);

   console.log(movies);

   const apiKey = "24e1069de660c324728bbf37a36d24bd";

   const handleSearch = (e) => {
      setSearchInput(e.target.value);
      console.log(searchInput);
   };

   // Set a 'delay' before evoking the handleSearch function  
   const debouncedHandleSearch = useMemo(() => {
      console.log(searchInput);
      return debounce(handleSearch, 300);
   }, []);

   // Search on type
   useEffect(() => {
      async function fetchMovies() {
         try {
            if (!searchInput) {
               return;
            }
            let endpoint = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=${apiKey}&language=pt-BR&page=1&include_adult=false`;

            let response = await axios.get(endpoint);
            setMovies(response.data.results);
         } catch (error) {
            console.log();
         }
      }
      fetchMovies();

   }, [searchInput]);


   return (
      <>
         <h2> Informações da lista </h2>
         <div className="form-control">
            <label htmlFor="input-nome">Seu nome</label>
            <input
               id="input-name"
               type="text"
               name="name"
            />
         </div>
         <h2> Selecione os títulos da lista </h2>
         <div className="form-control">
            <label htmlFor="input-search">Search</label>
            <input
               id="input-search"
               type="text"
               name="search"
               onChange={debouncedHandleSearch}
               placeholder="ex: senhor dos anéis"
            />
         </div>

         <div>
            {movies.length === 0 ? null : movies.map((currentElement) => {
               return (
                  <div key={currentElement.id}>
                     <p><strong>{currentElement.original_title} </strong> <button> + </button></p>
                  </div>
               );
            })}
         </div>
      </>
   );
}