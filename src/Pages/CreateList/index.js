import style from "./style.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";

import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";

export function CreateList() {
  const navigate = useNavigate();
  const urlAPI = "https://ironrest.cyclic.app/testeProjeto2";

  const [form, setForm] = useState({
    name: "",
    listTitle: "",
    listDescription: "",
    listMovies: [],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(urlAPI, form);
      // toast.success("Sua lista foi criada com sucesso!");

      navigate("/");
      console.log("response: " + response);
    } catch (error) {
      // toast.error("Ops, algo deu errado!");
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
          <form>
            <h2> Informações da lista </h2>

            <div className="form-group">
              <div className="form-control">
                <label htmlFor="input-nome">Seu nome</label>
                <input
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
                  className="form-item"
                  rows="4"
                  id="input-list-description"
                  type="text"
                  name="listDescription"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <SearchBar />

            <div className="form-actions">
              <Link to="/">Cancelar</Link>
              <button
                onSubmit={handleSubmit}
                className="btn btn-lg btn-primary"
              >
                Criar lista
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
