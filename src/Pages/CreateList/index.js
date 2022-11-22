import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import axios from 'axios';

export function CreateList() {
   const [search, setSearch] = useState("");
   const [searchInput, setSearchInput] = useState(search);
   const [movies, setMovies] = useState([]);

   const apiKey = "&api_key=24e1069de660c324728bbf37a36d24bd";

   const handleSearch = (e) => {
      console.log("const search: " + search);
      console.log("const inputSearch: " + searchInput);
      setSearch(e.target.value);
   };


   const sendHelp = async (e) => {
      e.preventDefault();
      const newSearch = search;
      setSearchInput(newSearch);
   };

   useEffect(() => {
      async function fetchMovies() {
         if (!searchInput) {
            console.log('nao tem pesquisa ainda');
            return;
         }
         try {
            console.log(searchInput);
            let endpoint = `https://api.themoviedb.org/3/search/movie?query=${search}${apiKey}`;
            let response = await axios.get(endpoint);
            let responseResults = response.data.results;
            setMovies(responseResults);
            console.log(movies);
         } catch (error) {
            console.log();
         }
      }
      fetchMovies();

   }, [searchInput]);


   return (
      <>
         <Header headerType="default" headerTitle="Crie sua própria lista de recomendações" />
         <section>
            <div className="container">
               <form onSubmit={sendHelp}>

                  <h2> Informações da lista </h2>
                  <div className="form-control">
                     <label htmlFor="input-search">Search</label>
                     <input
                        id="input-search"
                        type="text"
                        name="search"
                        value={search}
                        onChange={handleSearch}
                        placeholder="ex: senhor dos anéis"
                     />
                     <button>Buscar filme</button>
                  </div>

               </form>

               <div>
                  <div>

                     {movies.length === 0 ? null : movies.map((currentElement) => {
                        return (
                           <div key={currentElement.id}>
                              <p>{currentElement.originalTitle}</p>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}