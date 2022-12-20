import style from "./style.module.css";

export function CardMovie(props) {
   const { image, title, releaseDate, overview, movieId, removeMovie } = props;

   return (
      <article className={style.cardForm}>
         {removeMovie ?
            <button className={`${style.btnRoundDelete} ${style.btn}`} type="button" onClick={() => removeMovie(movieId)}></button>
            : null
         }

         <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} />
         <div className={style.cardContent}>
            <h3 className={style.title}>{title}</h3>
            <p className={style.year}>{new Date(releaseDate).getFullYear()}</p>
            <p className={style.overview}>{overview}</p>
         </div>
      </article>
   );
}