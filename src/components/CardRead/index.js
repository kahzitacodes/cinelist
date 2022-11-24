import style from "./style.module.css";

export function CardRead(props) {
  return (
    <div className={style.container}>
      <img className={style.img} src={props.img} alt="foto" />
      
      <div className={style.containerSecond}>
        <h2 className={style.nameList}>{props.nameList}</h2>
        <p className={style.year}>{props.year}</p>
        <p className={style.description}>{props.description}</p>
      </div>

     
    </div>
  );
}
