import style from "./style.module.css";
import { Link } from "react-router-dom";

export function Card(props) {
  return (




    <div className={style.container}>

      
      <Link to={'/create'}>
          <img className={style.img} src={props.img} alt="foto" />
      </Link>


      <Link to={`/${props.id}`}>
          <h2 className={style.nameList}>{props.nameList}</h2>
      </Link>

      <p className={style.director}>{props.director}</p>
    </div>
  );
}
 