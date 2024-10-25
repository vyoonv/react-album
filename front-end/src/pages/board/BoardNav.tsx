import styles from "./BoardNav.module.scss";

function BoardNav() {
  return (
    <div className={styles.nav}>
      <button className={styles.nav__button}>글쓰기</button>
    </div>
  );
}

export default BoardNav;
