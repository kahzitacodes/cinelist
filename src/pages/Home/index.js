import { api } from "../../services/api";
import 'react-loading-skeleton/dist/skeleton.css';
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { ListCardSkeleton } from "../../components/ListCardSkeleton";
import { ListCard } from "../../components/ListCard";
import { Hero } from "../../components/Hero";
import { Banner } from "../../components/Banner";

import michael from "../../images/michael-scott.webp";

export function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function fetchFilmes() {
      try {

        const response = await api.get("/lists");

        setFilmes(response.data);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
      }
    }

    fetchFilmes();
  }, []);

  return (
    <div>
      <Hero
        title="Crie listas seus filmes favoritos e compartilhe!"
        text="Acesse listas de recomendações e também compartilhe seus títulos favoritos"
      />

      <div className={`container ${style.sectionContainer}`}>

        {filmes.length === 0 ? (

          <div className={style.emptyLit}>
            <h2>Ops! Ainda não temos recomendações :(</h2>
            <img src={michael} alt="Disapointed Michael Scott" />
          </div>

        ) : (
          <>
            <h2 className={style.sectionTitle}>Confira estas recomendações! </h2>

            <div className={style.cardsContainer}>

              {isLoading ? <ListCardSkeleton cards={8} /> :
                filmes.map((filme) => (
                  <ListCard
                    key={filme._id}
                    id={filme._id}
                    listTitle={filme.listTitle}
                    autorName={filme.author}
                    img={`https://image.tmdb.org/t/p/w500${filme.listMovies[0].poster_path}`} />
                ))
              }
            </div>
          </>
        )}

        < Banner title="Crie listas com filmes favoritos e compartilhe!" />
      </div>

    </div>
  );
}
