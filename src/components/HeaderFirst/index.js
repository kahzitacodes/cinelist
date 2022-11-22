import style from "./style.module.css";


export function HeaderFirst(props) {
  return (

    <div className={style.div}>

      <img src={props.img} alt='Foto'/>

      <h1 className={style.title}>{props.title}</h1>

      <p className={style.text}>{props.text}</p>

      {/* <Link to="./teste"> */}
        <button className={style.button}>Crie uma lista</button>
      {/* </Link> */}

    </div>
  );
}
