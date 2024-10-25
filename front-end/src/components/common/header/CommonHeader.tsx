import { useNavigate } from "react-router-dom";
import styles from "./CommonHeader.module.scss";
import { useEffect, useState } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { useRecoilState } from "recoil";
import { userState } from "../../../stores/atoms/userState";

function CommonHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 성공 시
  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const profile = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );
      const registerDate = new Date().toISOString().split("T")[0]; // 날짜 yyyy-mm-dd 형식으로 넘기기
      // console.log('profile :: ', profile);

      // 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem(
        "storedUser",
        JSON.stringify({ name: profile.name, email: profile.email })
      );

      // recoil 상태 업데이트
      setUser({
        name: profile.name,
        email: profile.email,
        profileImg: profile.picture,
      });
      setIsLoggedIn(true);

      // 기존 사용자 여부 확인
      fetch("http://localhost:80/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: profile.email,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response error");
          }
          return response.json(); // 존재 여부 확인
        })
        .then((data) => {
          if (!data.exists) {
            // 존재하지 않는다면
            return fetch("http://localhost:80/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userName: profile.name,
                userEmail: profile.email,
                userProfile: profile.picture,
                registerDate,
                userDelFl: "N",
              }),
            });
          }
        })
        .then((response) => {
          if (response && !response.ok) {
            throw new Error("Network response error");
          }
          return response ? response.text() : null;
        })
        .then((data) => {
          if (data) {
            console.log(data);
          }
        })
        .catch((error) => console.error("error: ", error));
    } else {
      console.error("Credential is undefined");
    }
  };

  // 로그인 실패 시
  const handleLoginFailure = () => {
    console.log("로그인 실패");
  };

  // 로그인 유지
  useEffect(() => {
    const storedUser = localStorage.getItem("storedUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("storedUser");
    setUser({ name: "", email: "", profileImg: "" });
    setIsLoggedIn(false);
    navigate("/");
  };

  // 페이지 이동
  const moveToPage = (filter: string) => {
    if (filter === "main") navigate("/");
    if (filter === "bookmark") navigate("/bookmark");
    if (filter === "board") navigate("/board");
  };

  return (
    <GoogleOAuthProvider clientId="716214152050-hos6gdk3ckf321qg9b86sjkpb6b5mmes.apps.googleusercontent.com">
      <header className={styles.header}>
        <div
          className={styles.header__logoBox}
          onClick={() => moveToPage("main")}
        >
          <img
            src="src/assets/images/image-logo.png"
            alt=""
            className={styles.header__logoBox__logo}
          />
          <span className={styles.header__logoBox__title}>YoonSplash</span>
        </div>
        <div className={styles.header__profileBox}>
          {isLoggedIn ? (
            <>
              <button
                className={styles.header__profileBox__button}
                onClick={() => moveToPage("bookmark")}
              >
                북마크
              </button>
              <button
                className={styles.header__profileBox__button}
                onClick={() => moveToPage("board")}
              >
                게시판
              </button>
              <span className={styles.header__profileBox__userName}>
                {user.name} | {user.email}
              </span>
              <button
                className={styles.header__profileBox__button}
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          )}
        </div>
      </header>
    </GoogleOAuthProvider>
  );
}

export default CommonHeader;
