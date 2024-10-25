import { useNavigate } from "react-router-dom";
import styles from "./boardCss/BoardNav.module.scss";

function BoardNav() {
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate("/write");
  };

  return (
    <div className={styles.nav}>
      <button className={styles.nav__button} onClick={handleWriteClick}>
        글쓰기
      </button>
    </div>
  );
}

export default BoardNav;
