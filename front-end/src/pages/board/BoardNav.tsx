import { useNavigate } from "react-router-dom";
import styles from "./boardCss/BoardNav.module.scss";

function BoardNav() {
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate("/write");
  };

  return (
    <div className={styles.nav}>
      <div className={styles.nav__buttonArea}>
        <button
          className={styles.nav__buttonArea__button}
          onClick={handleWriteClick}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
}

export default BoardNav;
