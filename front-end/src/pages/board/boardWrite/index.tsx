import React from "react";
import BoardWrite from "./BoardWrite";
import CommonHeader from "../../../components/common/header/CommonHeader";

import styles from "../boardCss/Board.module.scss";

function index() {
  return (
    <div>
      <CommonHeader />
      <div className={styles.formContainer}>
        <BoardWrite />
      </div>
    </div>
  );
}

export default index;
