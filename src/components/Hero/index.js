import style from "./style.module.css";
import { Link } from "react-router-dom";

export function Hero(props) {
  return (
    <div className={style.hero}>
      <div className="container">
        <div className={style.heroContent}>
          <h1 className={style.title}>{props.title}</h1>

          <p className={style.text}>{props.text}</p>

          <Link to="/create">
            <button className="btn btn-lg btn-primary">Crie uma lista</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
