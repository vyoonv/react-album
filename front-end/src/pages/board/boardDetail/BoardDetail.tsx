import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../index/component/Loading";
import styles from "../boardCss/BoardDetail.module.scss";

function BoardDetail() {
  const { id } = useParams();
  const [boardItem, setBoardItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardItem = async () => {
      try {
        const response = await axios.get(`http://localhost/board/${id}`);
        setBoardItem(response.data);
      } catch (error) {
        console.error("게시물 데이터를 불러오지 못했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBoardItem();
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.boardArea}>
          <div className={styles.boardArea__boardTitle}>
            {boardItem.boardTitle}
          </div>
          <div className={styles.boardArea__boardContent}>
            {boardItem.boardContent}
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardDetail;
