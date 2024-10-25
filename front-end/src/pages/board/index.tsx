import BoardItem from "./BoardItem";
import { latestBoardListMock } from "../board/latest-board-list.mock";
import CommonHeader from "../../components/common/header/CommonHeader";
import BoardNav from "./BoardNav";

export default function index() {
  return (
    <>
      <CommonHeader />
      <BoardNav />
      {latestBoardListMock.map((boardItem) => (
        <BoardItem key={boardItem.boardNo} boardItem={boardItem} />
      ))}
    </>
  );
}
