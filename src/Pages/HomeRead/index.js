import { Header } from "../../components/Header";
import { CardRead } from "../../components/CardRead";
import style from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ButtonIcon } from "../../components/ButtonIcon";
import iconPencil from "../../images/edit-2.svg";
import iconTrash from '../../images/trash-2.svg'

export function HomeRead() {
  const [list, setList] = useState({});

  const params = useParams();
 const navigate= useNavigate()

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/testeProjeto2/${params.id}`
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

  async function handleDelete(id) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/testeProjeto2/${id}`);
     navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  const filmes = list.listMovies;
  console.log(filmes);
  return (
    <div>
      <Header
        headerTitle={list.listTitle}
        listAutor={list.name}
        listDescription={list.listDescription}
        headerType={"list"}
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

      {/* <button
        className="btn-outlined-ligh"
        onClick={() => {
          handleDelete(list._id);
        }}
      >
        Excluir lista{" "}
      </button> */}
      <div className={style.buttons}>
        <ButtonIcon
          icon={iconTrash}
          label="Excluir"
          btnSize="btn-md"
          btnStyle="btn-outlined-red"
          onClick={() => {
            handleDelete(list._id);
          }}
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


