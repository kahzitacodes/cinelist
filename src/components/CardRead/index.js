import style from "./style.module.css";

export function CardRead(props) {
  return (
    <div className={style.container}>
      
      <h2 className={style.nameList}>{props.nameList}</h2>

      <p className={style.description}>{props.description}</p>

      <h3 className={style.director}>{props.director}</h3>
    </div>
  );
}
