import style from "./style.module.css";

export function Footer(props) {
  return (
    <div className={style.div}>

     <img src={props.img} alt='Foto'/>
     
      <h1 className={style.title}>
        Crie listas com suas séries <br /> e filmes e compartilhe!
      </h1>

      {/* <Link to='/teste'> */}
      <button className={style.button}>Crie uma lista</button>
      {/* </Link> */}
    </div>
  );
}
