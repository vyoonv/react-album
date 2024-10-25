import { useState, useEffect } from "react";
import axios from "axios";
import BoardItem from "./BoardItem";
import CommonHeader from "../../components/common/header/CommonHeader";
import BoardNav from "./BoardNav";
import Board from "../index/types/board";
//import { latestBoardListMock } from "../board/latest-board-list.mock";

export default function index() {
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBoardList = async (): Promise<Board[]> => {
    try {
      const response = await axios.get("http://localhost/board/boardList");
      console.log(response.data);
      setBoardList(response.data);
    } catch (error) {
      console.error("게시물 데이터를 불러오지 못했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardList();
  }, []);

  return (
    <>
      <CommonHeader />
      <BoardNav />
      {/* {latestBoardListMock.map((boardItem, index) => (
        <BoardItem key={boardItem.boardNo} boardItem={boardItem} />
      ))} */}
      {loading ? (
        <p>로딩중 ...</p>
      ) : (
        boardList.map((boardItem) => (
          <BoardItem key={boardItem.boardNo} boardItem={boardItem} />
        ))
      )}
    </>
  );
}
