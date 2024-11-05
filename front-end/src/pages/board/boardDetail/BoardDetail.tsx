import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../index/component/Loading";
import styles from "../boardCss/BoardDetail.module.scss";
import CommentSection from "../CommentSection";

function BoardDetail() {
  const { id } = useParams();
  const [boardItem, setBoardItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(boardItem.likeCount);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchBoardItem = async () => {
      try {
        const response = await axios.get(`http://localhost/board/${id}`);
        setBoardItem(response.data.boardItem);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("게시물 데이터를 불러오지 못했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoardItem();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1)
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.boardArea}>
          <div className={styles.boardArea__boardTitle}>
            <div className={styles.boardArea__boardTitle__title}>
              {boardItem.boardTitle}
            </div>
            <div className={styles.boardArea__boardTitle__counts}>
              <div>👀 {boardItem.viewCount}</div>
              <div>❤️ {boardItem.likeCount}</div>
              <div>{formatDate(boardItem.writeDate)}</div>
            </div>
          </div>
          <div className={styles.boardArea__boardContent}>
            {boardItem.boardContent}
          </div>
          <div>{boardItem.boardImg}</div>
          <div>
            <button onClick={handleLike}>{isLiked ? "❤️" : "🤍"}공감</button>
          </div>

          <CommentSection comments={comments} boardNo={boardItem.boardNo} />
        </div>
      )}
    </div>
  );
}

export default BoardDetail;
