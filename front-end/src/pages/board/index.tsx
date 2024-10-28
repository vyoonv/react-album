import { useState, useEffect } from "react";
import axios from "axios";
import BoardItem from "./BoardItem";
import CommonHeader from "../../components/common/header/CommonHeader";
import BoardNav from "./BoardNav";
import Board from "../index/types/board";
import Loading from "../index/component/Loading";
//import { latestBoardListMock } from "../board/latest-board-list.mock";

export default function index() {
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBoardList = async (): Promise<Board[]> => {
    try {
      const response = await axios.get("http://localhost/board/boardList");
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
      {/* 기존에 데이터 없을때 추가했던 mock */}
      {/* {latestBoardListMock.map((boardItem, index) => (
        <BoardItem key={boardItem.boardNo} boardItem={boardItem} />
      ))} */}
      {loading ? (
        <Loading />
      ) : (
        boardList.map((boardItem) => (
          <BoardItem key={boardItem.boardNo} boardItem={boardItem} />
        ))
      )}
    </>
  );
}
