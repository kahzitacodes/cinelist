import style from './style.module.css';
import { Link } from "react-router-dom";
import { ButtonIcon } from "../ButtonIcon";
import iconPencil from "../../images/edit.svg";

export function Header(props) {

   const { headerType, headerTitle, listDescription, listAutor } = props;

   return (
      <header className={style.header}>
         <div className={`container ${style.container}`}>
            <div className={style.col1}>
               <Link className={style.linkBack} to="/">Voltar</Link>
               <h1>{headerTitle}</h1>
               {listDescription ?
                  <p className={style.headerDescription}>
                     {listDescription}
                  </p>
                  : null
               }

               {listAutor ? (<p>por {listAutor}</p>) : null}

            </div>
            {headerType === 'list' ?
               <div className={style.col2}>
                  <ButtonIcon icon={iconPencil} label="Editar" btnSize="btn-md" btnStyle="btn-outlined-light" />
               </div>
               : null
            }
         </div>
      </header>
   );
}