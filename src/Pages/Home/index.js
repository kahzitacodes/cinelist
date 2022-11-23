import { Card } from "../../components/Card";
import { Link } from "react-router-dom";
import { HeaderFirst } from "../../components/HeaderFirst";
import { Footer } from "../../components/Footer";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home(props) {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await axios.get(
          "https://ironrest.cyclic.app/testeProjeto2"
        );
        console.log(response);

        setFilmes([...response.data]);
      } catch (error) {}
    }

    fetchFilmes();
  }, []);

  return (
    <div>
      <HeaderFirst
        title="Compartilhe seus filmes e séries favoritos!"
        text="Acesse listas de recomendações e também compartilhe seus filmes e sériesfavotiros"
      />

      <div className={style.container}>
        {/* img={`https://image.tmdb.org/t/p/w500 ${filme.listMovies.backdrop_path}`} /> */}

        {filmes.slice(0, 8).map((filme) => (
          <Card
            nameList={filme.listTitle}
            director={filme.name}
            id={filme._id}
            description={filme.listDescription}
          />
        ))}
      </div>

      <Footer title="Crie listas com suas séries e filmes e compartilhe!" />
    </div>
  );
}
