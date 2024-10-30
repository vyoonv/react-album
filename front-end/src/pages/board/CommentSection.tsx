import styles from "../board/boardCss/BoardComment.module.scss";
import Comment from "../index/types/comment";

interface CommentProps {
  comments: Comment[];
}

function CommentSection({ comments = [] }: CommentProps) {
  return (
    <div className={styles.commentSection}>
      {comments.map((comment) => (
        <div key={comment.commentNo} className={styles.comment}>
          <img
            src={comment.userProfileImg}
            alt={`${comment.userName} 프로필 이미지`}
            className={styles.comment__profileImg}
          />
          <div className={styles.comment__content}>
            <p className={styles.comment__userName}>
              <strong>{comment.userName}</strong>
            </p>
            <p className={styles.comment__text}>{comment.commentContent}</p>
          </div>
        </div>
      ))}
      <div className={styles.comment__input}>
        <input type="text" placeholder="댓글을 입력하세요." />
        <button>댓글 등록</button>
      </div>
    </div>
  );
}

export default CommentSection;
