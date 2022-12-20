import style from "./style.module.css";
import { Link } from "react-router-dom";
import { ButtonIcon } from "../ButtonIcon";
import iconPencil from "../../images/edit.svg";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function Header(props) {
  const { listId, headerType, headerTitle, listDescription, listAutor, btnFunction, isLoading } = props;

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <header className={style.header}>
        <div className={`container ${style.container}`}>
          <div className={style.col1}>
            <Link className={style.linkBack} to="/">
              Voltar
            </Link>

            <h1>{headerTitle || <Skeleton height={32} />}</h1>

            {listDescription ?
              <p className={style.headerDescription}>{listDescription || <Skeleton height={15} count={2} />}</p>
              : null
            }

            {listAutor ?
              isLoading ? <Skeleton height={10} width={100} /> : (<p>por {listAutor}</p>)
              : null
            }
          </div>

          {headerType === "list" ? (
            <div className={style.col2}>
              <Link to={`/edit/${listId}`}>
                <ButtonIcon
                  btnFunction={btnFunction}
                  icon={iconPencil}
                  label="Editar"
                  btnSize="btn-md"
                  btnStyle="btn-outlined-light"
                />
              </Link>
            </div>
          ) : null}

        </div>
      </header>
    </SkeletonTheme>
  );
}
