import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";

export function CreateList() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    author: "",
    list_title: "",
    list_description: "",
    list_movies: [],
  });


  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  const addMovie = (movie) => {
    delete movie.isAdd;
    setForm({ ...form, list_movies: [...form.list_movies, movie] });
  };


  const removeMovie = (movieId) => {
    const filteredMovies = form.list_movies.filter(
      (currentElement) => currentElement.id !== movieId
    );
    setForm({ ...form, list_movies: [...filteredMovies] });
  };


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (form.list_movies.length === 0) {
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
      await api.post("/lists", form);
      toast.success("Sua lista foi criada com sucesso!");

      navigate("/");
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

      <main className="main main_form">
        <div className="container">
          <form className="form" onSubmit={handleSubmit}>
            <h2> Informações da lista </h2>

            <div className="form-group">
              <div className="form-control">
                <label htmlFor="input-nome">Seu nome</label>
                <input
                  required
                  className="form-item"
                  id="input-name"
                  type="text"
                  name="author"
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
                  name="list_title"
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
                  name="list_description"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <SearchBar
              addMovieAction={addMovie}
              removeMovieAction={removeMovie}
              moviesToDisplay={form.list_movies}
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
};