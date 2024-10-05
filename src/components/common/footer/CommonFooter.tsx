import styles from './CommonFooter.module.scss'

function CommonFooter() {
  return (
    <footer className={styles.footer}>
        <button className={styles.pagination__button}>
            <img src='src/assets/icons/icon-arrowLeft.svg' alt=''/>
        </button>
        {/* 변경될 UI 부분 */}
        <span>1</span>
        <button className={styles.pagination__button}>
            <img src='src/assets/icons/icon-arrowRight.svg' alt=''/>
        </button>
    </footer>
  )
}

export default CommonFooter