import { useEffect, useState } from "react";
import styles from "../board/boardCss/BoardComment.module.scss";
import Comment from "../index/types/comment";
import { key } from "localforage";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../stores/atoms/userState";

interface CommentProps {
  comments: Comment[];
}

function CommentSection({
  comments: initialComments = [],
  boardNo,
}: {
  comments: Comment[];
  boardNo: number;
}) {
  const [user] = useRecoilState(userState);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState<{ [key: number]: string }>(
    {}
  );
  const [replyVisible, setReplyVisible] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setComments(initialComments);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewComment(e.target.value);

  const handleReplyChange = (commentNo: number, value: string) => {
    setReplyComment((prev) => ({
      ...prev,
      [commentNo]: value,
    }));
  };

  const toggleReplyInput = (commentNo: number) => {
    setReplyVisible((prev) => ({
      ...prev,
      [commentNo]: !prev[commentNo],
    }));
  };

  const submitComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost/board/${boardNo}/comments`,
        {
          boardNo,
          commentContent: newComment,
          parentCommentNo: null,
          depth: 0, // 일반 댓글
          userEmail: user.email,
        }
      );

      if (response.status === 201) {
        setComments((prev) => [
          ...prev,
          {
            ...response.data,
            parentCommentNo: null,
          },
        ]);
        setNewComment("");
      }
    } catch (error) {
      console.error("댓글 등록 실패 : ", error);
      setError("댓글 등록에 실패했습니다.");
    }
  };

  const submitReplyComment = async (commentNo: number) => {
    const replyContent = replyComment[commentNo];
    if (!replyContent.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost/board/${boardNo}/comments`,
        {
          boardNo,
          commentContent: replyContent,
          parentCommentNo: commentNo,
          depth: 1, // 대댓글 깊이
          userEmail: user.email,
        }
      );

      if (response.status === 201) {
        setComments((prev) => [
          ...prev,
          {
            ...response.data, // 서버에서 반환된 새 대댓글 데이터
            parentCommentNo: commentNo,
          },
        ]);
        setReplyComment((prev) => ({
          ...prev,
          [commentNo]: "",
        }));
        setReplyVisible((prev) => ({
          ...prev,
          [commentNo]: false, // 대댓글 입력란 닫기
        }));
      }
    } catch (error) {
      console.error("대댓글 등록 실패 : ", error);
      setError("대댓글 등록 실패");
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
              {replyVisible[comment.commentNo] && (
                <div className={styles.comment__input}>
                  <input
                    type="text"
                    placeholder="댓글 입력하세요."
                    value={replyComment[comment.commentNo] || ""}
                    onChange={(e) =>
                      handleReplyChange(comment.commentNo, e.target.value)
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

      {/* 오류 메시지 표시 */}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default CommentSection;
