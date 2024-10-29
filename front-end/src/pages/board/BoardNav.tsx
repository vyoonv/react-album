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
        <button className={styles.nav__buttonArea__button} onClick={handleWriteClick}>
          글쓰기
        </button>
      </div>
      <div className={styles.nav}>
        <div className={styles.nav__boardHead}>
          <div className={styles.nav__boardHead__number}>번호</div>
          <div className={styles.nav__boardHead__title}>제목</div>
          <div className={styles.nav__boardHead__date}>날짜</div>
          <div className={styles.nav__boardHead__views}>조회수</div>
          <div className={styles.nav__boardHead__likes}>공감</div>
        </div>
      </div>
    </div>
  );
}

export default BoardNav;
