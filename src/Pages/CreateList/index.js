import style from "./style.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";

export function CreateList() {
  const navigate = useNavigate();
  const urlAPI = "https://ironrest.cyclic.app/testeProjeto2";

  const [moviesToAdd, setMoviesToAdd] = useState([]);

  const [form, setForm] = useState({
    name: "",
    listTitle: "",
    listDescription: "",
    listMovies: [],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const addMovie = (movie) => {
    setMoviesToAdd([...moviesToAdd, movie]);
    setForm({ ...form, listMovies: [...moviesToAdd, movie] });
  };
  const removeMovie = (movieId) => {
    const filteredMovies = moviesToAdd.filter(
      (currentElement) => currentElement.id !== movieId
    );
    setMoviesToAdd(filteredMovies);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (form.listMovies.length === 0) {
        toast((t) => (
          <div className="toast-content">
            <span>Adicione um filme na sua lista!</span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Entendi
            </button>
          </div>
        ));
        return;
      }
      const response = await axios.post(urlAPI, form);
      toast.success("Sua lista foi criada com sucesso!");

      navigate("/");
      console.log("response: " + response);
    } catch (error) {
      toast.error("Ops, algo deu errado!");
      console.log(error);
    }
  }

  return (
    <>
      <Header
        headerType="default"
        headerTitle="Crie sua própria lista de recomendações"
      />

      <main className="main">
        <div className={style.container}>
          <form onSubmit={handleSubmit}>
            <h2> Informações da lista </h2>

            <div className="form-group">
              <div className="form-control">
                <label htmlFor="input-nome">Seu nome</label>
                <input
                  required
                  className="form-item"
                  id="input-name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label htmlFor="input-list-title">Título da sua lista</label>
                <input
                  required
                  className="form-item"
                  id="input-list-title"
                  type="text"
                  name="listTitle"
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label htmlFor="input-list-description">
                  Breve descrição da sua lista
                </label>
                <textarea
                  required
                  className="form-item"
                  rows="4"
                  id="input-list-description"
                  type="text"
                  name="listDescription"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <SearchBar
              addMovieAction={addMovie}
              removeMovieAction={removeMovie}
              moviesToDisplay={form.listMovies}
            />

            <div className="form-actions">
              <Link to="/">Cancelar</Link>
              <button className="btn btn-lg btn-primary">Criar lista</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
