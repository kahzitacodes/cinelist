import style from "./style.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";

export function EditList() {
   return (
      <>
         <Header headerType="default" headerTitle="Edita a sua lista de recomendações" />

         <main className="main">
            <div className={style.container}>
               <form /*onSubmit={handleSubmit}*/>

                  <h2>Modificações das informações da lista</h2>

                  <div className="form-group">
                     <div className="form-control">
                        <label htmlFor="input-nome">Seu nome</label>
                        <input
                           required
                           className="form-item"
                           id="input-name"
                           type="text"
                           name="name"
                           //onChange={handleChange}
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
                           //onChange={handleChange}
                        />
                     </div>
                     <div className="form-control">
                        <label htmlFor="input-list-description">A descrição da sua lista</label>
                        <textarea
                           required
                           className="form-item"
                           rows="4"
                           id="input-list-description"
                           type="text"
                           name="listDescription"
                           //onChange={handleChange}
                        ></textarea>
                     </div>
                  </div>

                  {/* <SearchBar addMovieAction={addMovie} removeMovieAction={removeMovie} moviesToDisplay={form.listMovies} /> */}

                  <div className="form-actions">
                     <Link to="/">Cancelar</Link>
                     <button className="btn btn-lg btn-primary">Editar lista</button>
                  </div>
               </form>
            </div>
         </main>
      </>
   );
}