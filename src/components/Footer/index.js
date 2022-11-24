import style from "./style.module.css";
import { Link } from "react-router-dom";

export function Footer(props) {
  return (
    <div className={style.div}>
      <h1 className={style.title}>{props.title}</h1>

      <Link to="/create">
        <button className={style.button}>Crie uma lista</button>
      </Link>
    </div>
  );
}
