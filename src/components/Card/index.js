import style from "./style.module.css";

export function Card(props) {
  return (
    <div className={style.container}>
      
      <img className={style.img} src={props.img} alt="foto" />

      <h2 className={style.nameList}>{props.nameList}</h2>

      <h3 className={style.director}>{props.director}</h3>
    </div>
  );
}
 