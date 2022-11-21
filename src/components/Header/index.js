import style from './style.module.css';
import { Link } from "react-router-dom";
import { ButtonIcon } from "../ButtonIcon";
import iconPencil from "../../images/edit.svg";

export function Header(props) {

   const { listTitle, listDescription, listAutor } = props;

   return (
      <header className={style.header}>
         <div className={`container ${style.container}`}>
            <div className={style.col1}>
               <Link className={style.linkBack} to="/">Voltar</Link>
               <h1>{listTitle}</h1>
               <p className={style.headerDescription}>
                  {listDescription}
               </p>
               <p>por {listAutor}</p>
            </div>
            <div className={style.col2}>
               <ButtonIcon icon={iconPencil} label="Editar" btnSize="btn-md" btnStyle="btn-outlined-light" />
            </div>
         </div>
      </header>
   );
}