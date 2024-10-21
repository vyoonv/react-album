import React from "react";
import BoardItem from "./BoardItem";
import Board from "../index/types/board";
import logo from "../../assets/images/image-logo.png";

export default function index() {
  const boardItem: Board = {
    boardNo: 1,
    boardTitle: "제목",
    boardContent: "내용",
    boardImg: null,
    commentCount: 1,
    likeCount: 1,
    viewCount: 1,
    writeDate: "2024-10-01",
    writerName: "someone",
    writerProfileImg: logo,
  };

  return (
    <>
      <BoardItem boardItem={boardItem} />
    </>
  );
}
