import style from "./style.module.css";

export function ButtonIcon(props) {
  const { btnSize, btnStyle, label, icon, btnFunction } = props;

  return (
    <>
      <button
        className={`btn ${btnSize} ${btnStyle} ${style.btnIcon}`}
        onClick={btnFunction}
      >
        <img src={icon} alt={label} />
        {label}
      </button>
    </>
  );
}
