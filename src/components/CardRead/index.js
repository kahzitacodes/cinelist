import style from "./style.module.css";
import { Link } from "react-router-dom";

export function CardRead(props) {
  return (




    <div className={style.container}>

      
      <Link to={`/${props.id}`}>
          <img className={style.img} src={props.img} alt="foto" />
      </Link>


      <Link to={`/${props.id}`}>
          <h2 className={style.nameList}>{props.nameList}</h2>
      </Link>

      <h3 className={style.director}>{props.director}</h3>
    </div>
  );
}
 