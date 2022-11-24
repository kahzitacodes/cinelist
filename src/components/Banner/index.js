import style from "./style.module.css";
import { Link } from "react-router-dom";

export function Banner(props) {
  return (
    <div className={style.bannerContainer}>
      <div className={style.content}>

        <h1 className={style.title}>{props.title}</h1>

        <Link to="/create">
          <button className="btn btn-lg btn-primary">Crie uma lista</button>
        </Link>

      </div>
    </div>
  );
}
