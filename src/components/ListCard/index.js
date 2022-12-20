import style from "./style.module.css";
import { Link } from "react-router-dom";

export function ListCard(props) {
  return (
    <div className={style.cardContainer}>
      <Link to={`/${props.id}`}>
        <img className={style.cardImg} src={props.img} alt="foto" />
      </Link>

      <Link to={`/${props.id}`}>
        <h2 className={style.cardTitle}>{props.listTitle}</h2>
      </Link>

      <p className={style.cardDetails}>Por {props.autorName}</p>

    </div>
  );
}
