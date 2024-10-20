import Board from "../index/types/board";
import styles from "./Board.module.scss";

interface props {
  boardItem: Board;
}

function BoardItem({ boardItem }: Props) {
  // properties
  const { boardNo, boardTitle, boardContent, boardImg } = boardItem;
  const { likeCount, commentCount, viewCount } = boardItem;
  const { writeDate, writerName, writerProfileImg } = boardItem;

  return (
    <div className={styles.boardListItem}>
      <div className={styles.boardListItem__mainBox}>
        <div className={styles.boardListItem__mainBox__top}>
          <div className={styles.boardListItem__mainBox__top__profileBox}>
            <div className={styles.boardListItem__mainBox__top__profileImg}>
              {writerProfileImg}
              <img src="../assets/images/image-logo.png" />
            </div>
          </div>
          <div className={styles.boardListItem__mainBox__writeBox}>
            <div className={styles.boardListItem__mainBox__writeBox__nickName}>
              {writerName}
            </div>
            <div className={styles.boardListItem__mainBox__writeBox__writeDate}>
              {writeDate}
            </div>
          </div>
        </div>
        <div className={styles.boardListItem__mainBox__mid}>
          <div className={styles.boardListItem__mainBox__mid__title}>
            {boardTitle}
          </div>
          <div className={styles.boardListItem__mainBox__mid__content}>
            {boardContent}
          </div>
        </div>
        <div className={styles.boardListItem__mainBox__bot}>
          <div className={styles.boardListItem__mainBox__bot__counts}>
            {`댓글 ${commentCount} 좋아요 ${likeCount} 조회수 ${viewCount}`}
          </div>
        </div>
      </div>
      {boardImg !== null && (
        <div className={styles.boardListItem__imageBox}>
          <div className={styles.boardListItem__imageBox__image}></div>
        </div>
      )}
    </div>
  );
}

export default BoardItem;
