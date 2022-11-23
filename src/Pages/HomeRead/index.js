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

  return (
    <div>
      <Header />

      <div className={style.container}>
        {/* img={filme.image}  */}

        {list.map((filme) => (
          <CardRead
            nameList={filme.listTitle}
            director={filme.name}
            id={filme._id}
          />
        ))}
      </div>

      <Link to="/create">
        <button className={style.button}>Editar lista</button>
      </Link>

      <Link to="/create">
        <button className={style.button}>Excluir lista</button>
      </Link>
    </div>
  );
}
