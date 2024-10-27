import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        <p>로딩중...</p>
      ) : (
        <div>
          <h3>{boardItem.boardTitle}</h3>
          <p>{boardItem.boardContent}</p>
        </div>
      )}
    </div>
  );
}

export default BoardDetail;
