import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";

export function EditList() {

   const navigate = useNavigate();

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
      delete movie.isAdd;
      setForm({ ...form, listMovies: [...form.listMovies, movie] });
   };


   const removeMovie = (movieId) => {
      const filteredMovies = form.listMovies.filter(
         (currentElement) => currentElement.id !== movieId
      );
      setForm({ ...form, listMovies: [...filteredMovies] });
   };


   const params = useParams();


   useEffect(() => {
      async function fetchNote() {
         try {

            const response = await axios.get(`https:/ironrest.cyclic.app/CineList/${params.id}`);

            setForm(response.data);

         } catch (err) {
            console.log(err);
         }

      }
      fetchNote();
   }, []);


   async function handleSubmit(e) {

      e.preventDefault();

      try {
         const infosToSendForAPI = { ...form };

         delete infosToSendForAPI._id;
         await axios.put(`https://ironrest.cyclic.app/CineList/${params.id}`, infosToSendForAPI);
         navigate("/");

      }
      catch (err) {
         console.log(err);
         toast.error("Ops! Algo deu errado ...");
      }
   }


   return (
      <>
         <Header headerType="default" headerTitle="Editar lista" />

         <main className="main main_form">
            <div className="container">
               <form className="form" onSubmit={handleSubmit}>

                  <h2>Informações da lista</h2>

                  <div className="form-group">
                     <div className="form-control">
                        <label htmlFor="input-nome">Seu nome</label>
                        <input
                           required
                           className="form-item"
                           id="input-name"
                           type="text"
                           name="name"
                           value={form.name}
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
                           value={form.listTitle}
                           onChange={handleChange}
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
                           value={form.listDescription}
                           onChange={handleChange}
                        ></textarea>
                     </div>
                  </div>

                  <SearchBar
                     addMovieAction={addMovie}
                     removeMovieAction={removeMovie}
                     moviesToDisplay={form.listMovies}
                     documentId={params.id}
                  />

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
