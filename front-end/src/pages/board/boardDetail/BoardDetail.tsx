import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../index/component/Loading";
import styles from "../boardCss/BoardDetail.module.scss";
import CommentSection from "../CommentSection";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../stores/atoms/userState";

function BoardDetail() {
  const { id } = useParams();
  const [boardItem, setBoardItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const user = useRecoilValue(userState);
  console.log("사용자 정보 : ", user);

  useEffect(() => {
    const fetchBoardItem = async () => {
      if (!user || !user.email) {
        console.error("사용자 이메일이 존재하지 않습니다.");
        return;
      }
      const userEmail = user.email;
      console.log("userEmail : ", userEmail);
      try {
        await axios.post(`http://localhost/board/${id}/viewCount`);
        const response = await axios.get(`http://localhost/board/${id}`, {
          params: { userEmail },
        });
        console.log("응답 데이터 : ", response.data);
        setBoardItem(response.data.boardItem);
        setComments(response.data.comments || []);
        setLikeCount(response.data.boardItem.likeCount || 0);
        setIsLiked(response.data.boardItem.isLiked);
      } catch (error) {
        console.error("게시물 데이터를 불러오지 못했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.email) {
      fetchBoardItem();
    }
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

  const handleLike = async () => {
    const newLikedState = !isLiked;
    console.log("Before Sending:", {
      isLiked: newLikedState,
      userEmail: user.email,
    });
    try {
      const response = await axios.post(`http://localhost/board/${id}/like`, {
        isLiked: newLikedState,
        userEmail: user.email,
      });
      console.log("Response Data:", response.data);
      setLikeCount(response.data.likeCount);
      setIsLiked(newLikedState);
    } catch (error) {
      console.error("좋아요 업데이트 실패", error);
    }
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
            <div>
              <button
                onClick={handleLike}
                className={styles.boardArea__boardContent__likeButton}
              >
                공감 {boardItem.isLiked ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
          <div>{boardItem.boardImg}</div>

          <CommentSection comments={comments} boardNo={boardItem.boardNo} />
        </div>
      )}
    </div>
  );
}

export default BoardDetail;
