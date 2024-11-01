import { useState } from "react";
import styles from "../board/boardCss/BoardComment.module.scss";
import Comment from "../index/types/comment";

interface CommentProps {
  comments: Comment[];
}

function CommentSection({ comments = [] }: CommentProps) {
  const [replyComment, setReplyComment] = useState({});
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (e) => setNewComment(e.target.value);

  const toggleReplyInput = (commentNo) => {
    setReplyComment((prev) =>
      prev[commentNo]
        ? { ...prev, [commentNo]: "" }
        : { ...prev, [commentNo]: "" }
    );
  };

  return (
    <div className={styles.commentSection}>
      {comments
        .filter((comment) => !comment.parentCommentNo)
        .map((comment) => (
          <div key={comment.commentNo} className={styles.comment}>
            <img
              src={comment.userProfileImg}
              alt={`${comment.userName} 프로필 이미지`}
              className={styles.comment_profileImg}
            />
            <div className={styles.comment__content}>
              <p className={styles.comment__userName}>
                <strong>{comment.userName}</strong>
              </p>
              <p className={styles.comment_text}>{comment.commentContent}</p>

              {/* 대댓글 표시 */}
              <button onClick={() => toggleReplyInput(comment.commentNo)}>
                댓글
              </button>
              {replyComment[comment.commentNo] !== undefined && (
                <div className={styles.comment__input}>
                  <input
                    type="text"
                    placeholder="댓글 입력하세요."
                    value={replyComment[comment.commentNo]}
                    onChange={(e) =>
                      setReplyComment({
                        ...replyComment,
                        [comment.commentNo]: e.target.value,
                      })
                    }
                  />
                  <button>등록</button>
                </div>
              )}

              {/* 대댓글 렌더링 */}
              {comments
                .filter((reply) => reply.parentCommentNo === comment.commentNo)
                .map((reply) => (
                  <div key={reply.commentNo} className={styles.replyComment}>
                    <img
                      src={reply.userProfileImg}
                      alt={`${reply.userName} 프로필 이미지`}
                      className={styles.replyComment__profileImg}
                    />
                    <div className={styles.replyComment__content}>
                      <p className={styles.replyComment__userName}>
                        <strong>{reply.userName}</strong>
                      </p>
                      <p className={styles.replyComment__text}>
                        {reply.commentContent}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

      {/* 새 댓글 입력 */}
      <div className={styles.comment__input}>
        <input
          type="text"
          value={newComment}
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요."
        />
        <button>등록</button>
      </div>
    </div>
  );
}

export default CommentSection;
