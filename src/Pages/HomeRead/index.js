import { Header } from "../../components/Header";
import { CardRead } from "../../components/CardRead";
import style from "./style.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function HomeRead() {
  const [list, setList] = useState([]);

  const params = useParams();

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/testeProjeto2/${params.id}`
        );
        console.log(response);

        setList([response.data]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchFilmes();
  }, []);

  console.log(list);

  async function handleDelete(id) {
    try {
      axios.delete(`https://ironrest.cyclic.app/CineList/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* <Header /> */}
      {/* img={filme.image}  */}
      {list.map((filme) => (
        <Header
          headerTitle={filme.listTitle}
          listAutor={filme.name}
          listDescription={filme.listDescription}
          id={filme._id}
        />
      ))}

      <div className={style.container}>

      </div>

      <Link to="/edit">
        <button className={style.button}>Editar lista</button>
      </Link>

      <Link to="/">
        <button
          className={style.button}
          onClick={() => {
          handleDelete();
          }}
        >
          Excluir lista
        </button>
      </Link>
    </div>
  );
}
