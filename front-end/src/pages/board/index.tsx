import BoardItem from "./BoardItem";
import { latestBoardListMock } from "../board/latest-board-list.mock";

export default function index() {
  return (
    <>
      {latestBoardListMock.map((boardItem) => (
        <BoardItem key={boardItem.boardNo} boardItem={boardItem} />
      ))}
    </>
  );
}
