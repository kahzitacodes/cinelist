import style from "./style.module.css";

export function ButtonIcon(props) {

   const { btnSize, btnStyle, label, icon } = props;

   return (
      <>
         <button className={`btn ${btnSize} ${btnStyle} ${style.btnIcon}`}>
            <img src={icon} alt={label} />
            {label}
         </button>
      </>
   );
}