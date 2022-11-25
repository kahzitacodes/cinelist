import { Header } from "../../components/Header";
import { CardRead } from "../../components/CardRead";
import style from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ButtonIcon } from "../../components/ButtonIcon";
import iconPencil from "../../images/edit-2.svg";
import iconTrash from '../../images/trash-2.svg';
import toast from "react-hot-toast";

export function HomeRead() {
  const [list, setList] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/CineList/${params.id}`
        );

        console.log(response.data);

        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFilmes();
  }, []);

  console.log(list);

  async function deleteList(id, toastId) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/CineList/${id}`);
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

  const filmes = list.listMovies;

  return (
    <div>
      <Header
        headerTitle={list.listTitle}
        listAutor={list.name}
        listDescription={list.listDescription}
        headerType={"list"}
        listId={list._id}
      />

      <div className={`container ${style.container}`}>
        {filmes &&
          filmes.map((currentMovie) => {
            return (
              <CardRead
                nameList={currentMovie.title}
                description={currentMovie.overview}
                year={new Date(currentMovie.release_date).getFullYear()}
                img={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
              />
            );
          })}
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


