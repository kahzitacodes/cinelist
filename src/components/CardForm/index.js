import style from "./style.module.css";

export function CardForm(props) {
   const { imagePath, movieTitle, movieDate, movieOverview, movieId, removeMovie } = props;

   return (
      <article className={style.cardForm}>
         <button className={`${style.btnRoundDelete} ${style.btn}`} type="button" onClick={() => removeMovie(movieId)}></button>
         <img src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={movieTitle} />
         <div className={style.cardContent}>
            <h3 className={style.title}>{movieTitle}</h3>
            <p className={style.year}>{new Date(movieDate).getFullYear()}</p>
            <p className={style.overview}>{movieOverview}</p>
         </div>
      </article>
   );
}