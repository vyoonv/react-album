import { useNavigate } from "react-router-dom";
import Board from "../index/types/board";
import styles from "./Board.module.scss";
import DefaultProfileImage from "../../assets/images/defaultProfile.jpg";

interface Props {
  boardItem: Board;
}

function BoardItem({ boardItem }: Props) {
  // properties
  const { boardNo, boardTitle, boardContent, boardImg } = boardItem;
  const { likeCount, commentCount, viewCount } = boardItem;
  const { writeDate, writerName, writerProfileImg } = boardItem;
  console.log("Writer Profile Image URL:", writerProfileImg);
  console.log("Default Profile Image URL:", DefaultProfileImage);
  console.log("Board Image URL:", boardImg);

  const navigator = useNavigate();

  const onClickHandler = () => {
    navigator(boardNo);
  };

  return (
    <div className={styles.boardListItem}>
      <div className={styles.boardListItem__mainBox}>
        <div className={styles.boardListItem__mainBox__top}>
          <div className={styles.boardListItem__mainBox__top__profileBox}>
            <div
              className={
                styles.boardListItem__mainBox__top__profileBox__profileImg
              }
              style={{
                backgroundImage: `url(${
                  writerProfileImg ? writerProfileImg : DefaultProfileImage
                })`,
              }}
            ></div>
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
          <div
            className={styles.boardListItem__imageBox__image}
            style={{
              backgroundImage: `url(${
                boardImg ? boardImg : DefaultProfileImage
              })`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default BoardItem;
