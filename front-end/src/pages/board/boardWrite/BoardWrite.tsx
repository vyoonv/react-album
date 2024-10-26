import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../../index/types/board";
import { useRecoilState } from "recoil";
import { userState } from "../../../stores/atoms/userState";
//CSS
import styles from "../boardCss/BoardWrite.module.scss";

function BoardWrite() {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [boardImg, setBoardImg] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!boardTitle || !boardContent) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newBoardItem: Board = {
      boardTitle,
      boardContent,
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
      writerName: user.name,
      writerProfileImg: user.profileImg,
      boardImg: null,
      userEmail: user.email,
    };

    fetch("http://localhost:80/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoardItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/board");
      })
      .catch((error) => console.error("error : ", error));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setBoardImg(file);
  };

  return (
    <>
      <form className={styles.boardWriteForm} onSubmit={handleSubmit}>
        <h3 className={styles.boardWriteForm__title}>글쓰기</h3>
        <div className={styles.boardWriteForm__form}>
          <label htmlFor="title" className={styles.label}>
            제목 :
          </label>
          <input
            id="title"
            type="text"
            className={styles.input}
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.boardWriteForm__form}>
          <label htmlFor="image" className={styles.label}>
            이미지 첨부:
          </label>
          <input
            id="image"
            type="file"
            className={styles.fileInput}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.boardWriteForm__form}>
          <label htmlFor="content" className={styles.label}>
            내용 :{" "}
          </label>
          <textarea
            id="content"
            className={styles.textarea}
            value={boardContent}
            onChange={(e) => setBoardContent(e.target.value)}
            required
          />
        </div>
        <div className={styles.buttonArea}>
          <button type="submit" className={styles.buttonArea__button}>
            제출
          </button>
          <button
            type="button"
            className={styles.buttonArea__button}
            onClick={() => navigate("/board")}
          >
            목록으로
          </button>
        </div>
      </form>
    </>
  );
}

export default BoardWrite;
