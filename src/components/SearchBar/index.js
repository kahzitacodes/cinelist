import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import style from "./style.module.css";

export function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [moviesToAdd, setMoviesToAdd] = useState([]);
  const [open, setOpen] = useState(false);

  console.log(movies);
  console.log("Total de " + moviesToAdd.length);
  console.log(moviesToAdd);

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

  const addMovie = (movie) => {
    setMoviesToAdd([...moviesToAdd, movie]);
    setOpen(false);
    setSearchInput("");
  };

  const removeMovie = (movieId) => {
    const filteredMovies = moviesToAdd.filter(
      (currentElement) => currentElement.id !== movieId
    );
    setMoviesToAdd(filteredMovies);
  };

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
        {!open ? null : (
          <div
            className={style.dropdown}
            style={{
              marginBottom: 30,
              height: 360,
              overflow: "scrool",
              background: "white",
              top: "75px",
              width: "100%",
              position: "absolute",
              boxShadow: "0px 1px 20px rgba(16, 24, 40, 0.25)",
              borderRadius: "8px",
              padding: "12px",
              zIndex: 9999,
            }}
          >
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "5px 0",
              }}
            >
              {movies.map((currentElement) => {
                return (
                  <li
                    key={currentElement.id}
                    style={{
                      padding: "15px 0",
                      borderBottom: "1px solid #dddddd",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <strong>{currentElement.title} </strong>

                    <button
                      className={style.toggle}
                      type="button"
                      onClick={() => addMovie(currentElement)}
                      style={{ width: 35 }}
                    >
                      {" "}
                      +{" "}
                    </button>

                    <button
                      type="button"
                      onClick={() => removeMovie(currentElement.id)}
                      style={{ width: 35 }}
                    >
                      {" "}
                      -{" "}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* display cards added to array/form */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 24,
            flexDirection: "column",
          }}
        >
          {moviesToAdd.map((addedMovie) => {
            return (
              <div
                key={addedMovie.id}
                style={{
                  display: "flex",
                  position: "relative",
                  border: "1px solid #dddd",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <button
                  style={{ position: "absolute", top: 10, right: 10 }}
                  type="button"
                >
                  ✅
                </button>
                <img
                  height={241}
                  src={`https://image.tmdb.org/t/p/w500/${addedMovie.poster_path}`}
                  alt={addedMovie.title}
                />
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
