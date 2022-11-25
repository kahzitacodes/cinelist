import { Card } from "../../components/Card";
import { HeaderFirst } from "../../components/HeaderFirst";
import { Banner } from "../../components/Banner";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import michael from "../../images/michael-scott.webp"


export function Home() {

  const [filmes, setFilmes] = useState([]);


  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await axios.get(
          "https://ironrest.cyclic.app/CineList"
        );
        console.log(response);

        setFilmes([...response.data]);
      } catch (error) { }
    }

    fetchFilmes();
  }, []);


  return (
    <div>
      <HeaderFirst
        title="Crie listas seus filmes favoritos e compartilhe!"
        text="Acesse listas de recomendações e também compartilhe seus títulos favoritos"
      />

      <div className={`container ${style.sectionContainer}`}>

        {!setFilmes && (
          <div className={style.emptyLit}>
            <h2>Ops! Ainda não temos recomendações :(</h2>
            <img src={michael} alt="Disapointed Michael Scott" />
          </div>
        )}

        <h2 className={style.sectionTitle}>Confira estas recomendações! </h2>

        <div className={style.cardsContainer}>

          {filmes.slice(0, 8).map((filme) => (
            <Card
              key={filme._id}
              id={filme._id}
              nameList={filme.listTitle}
              autorName={filme.name}
              description={filme.listDescription}
              img={`https://image.tmdb.org/t/p/w500${filme.listMovies[0].poster_path}`} />
          ))}

        </div>
        <Banner title="Crie listas com suas séries e filmes e compartilhe!" />
      </div>

    </div>
  );
}
