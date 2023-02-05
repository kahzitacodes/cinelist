import 'react-loading-skeleton/dist/skeleton.css';
import style from "./style.module.css";
import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { CardMovie } from "../../components/CardMovie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CardMovieSkeleton } from "../../components/CardMovieSkeleton";
import { ButtonIcon } from "../../components/ButtonIcon";
import iconPencil from "../../images/edit-2.svg";
import iconTrash from '../../images/trash-2.svg';
import toast from "react-hot-toast";

export function ListDetails() {
  const [list, setList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFilmes() {
      try {

        const response = await api.get(`/lists/${params.id}`);
        setList(response.data[0]);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFilmes();
  }, [params.id]);

  async function deleteList(id, toastId) {
    try {
      await api.delete(`/lists/${id}`);
      toast.dismiss(toastId);
      toast.success('Lista deletada com sucesso!');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    toast((t) => {
      return (
        <div className="toast-content-v">
          <div className="toast-head">
            <img src={iconTrash} alt="lixeiera"></img>
            <h4>Excluir lista?</h4>
          </div>
          <p>A lista será deletada de forma permanente.</p>
          <div className="toast-footer">
            <button className="btn btn-sm btn-link" onClick={() => toast.dismiss(t.id)}>
              Cancelar
            </button>
            <button className="btn btn-sm btn-red" onClick={() => deleteList(id, t.id)}>
              Excluir
            </button>
          </div>
        </div>
      );
    }, {
      duration: Infinity,
    });

  }

  return (
    <div>
      <Header
        headerType={"list"}
        isLoading={isLoading}
        listAutor={list.author}
        headerTitle={list.listTitle}
        listDescription={list.listDescription}
        listDate={list.createdAt}
        listId={list._id}
      />
      <div className={`container ${style.container}`}>

        {isLoading ? <CardMovieSkeleton cards={8} /> :

          list.listMovies && list.listMovies.map((currentMovie) => {
            return (
              <CardMovie
                key={currentMovie.id}
                title={currentMovie.title}
                overview={currentMovie.overview}
                releaseDate={new Date(currentMovie.release_date).getFullYear()}
                image={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
              />
            );
          })
        }
      </div>

      <div className={style.buttons}>
        <ButtonIcon
          icon={iconTrash}
          label="Excluir"
          btnSize="btn-md"
          btnStyle="btn-outlined-red"
          btnFunction={() => handleDelete(list._id)}
        />

        <Link to={`/edit/${list._id}`}>
          <ButtonIcon
            icon={iconPencil}
            label="Editar"
            btnSize="btn-md"
            btnStyle="btn-outlined-primary"
          />
        </Link>
      </div>
    </div>
  );
}


