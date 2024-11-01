import { useState } from "react";
import styles from "../board/boardCss/BoardComment.module.scss";
import Comment from "../index/types/comment";
import { key } from "localforage";
import axios from "axios";

interface CommentProps {
  comments: Comment[];
}

function CommentSection({
  comments = [],
  boardNo,
}: {
  comments: Comment[];
  boardNo: number;
}) {
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState<{ [key: number]: string }>(
    {}
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewComment(e.target.value);

  const handleReplyChange = (commentNo: number, value: string) => {
    setReplyComment((prev) => ({
      ...prev,
      [commentNo]: value,
    }));
  };

  const toggleReplyInput = (commentNo: number) => {
    setReplyComment((prev) => ({
      ...prev,
      [commentNo]: prev[commentNo] ? "" : "",
    }));
  };

  const submitComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post("/api/comments", {
        boardNo,
        commentContent: newComment,
      });

      if (response.status === 201) {
        setNewComment("");
      }
    } catch (error) {
      console.error("댓글 등록 실패 : ", error);
    }
  };

  const submitReplyComment = async (commentNo: number) => {
    const replyContent = replyComment[commentNo];
    if (!replyContent.trim()) return;

    try {
      const response = await axios.post("/api/comments", {
        boardNo,
        commentContent: replyContent,
        parentCommentNo: commentNo,
      });

      if (response.status === 201) {
        setReplyComment((prev) => ({
          ...prev,
          [commentNo]: "",
        }));
      }
    } catch (error) {
      console.error("대댓글 등록 실패 : ", error);
    }
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
                  <button onClick={() => submitReplyComment(comment.commentNo)}>
                    등록
                  </button>
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
        <button onClick={submitComment}>등록</button>
      </div>
    </div>
  );
}

export default CommentSection;
