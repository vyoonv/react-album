import { useNavigate } from 'react-router-dom'
import styles from './CommonHeader.module.scss'
import { useState } from 'react'
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google'

function CommonHeader() {

  const navigate = useNavigate()

  // 로그인 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState({ name: '', email: ''}); 
  
  // 로그인 성공 시 
  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const profile = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      setUser({ name: profile.name, email: profile.email });
      setIsLoggedIn(true);
  
      fetch('http://localhost:80/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: profile.name,
          userEmail: profile.email,
          userProfile: profile.picture,
        }),
      });
    } else {
      console.error("Credential is undefined");
    }
  }

  // 로그인 실패 시 
  const handleLoginFailure = () => {
    console.log('로그인 실패'); 
  }

  // 페이지 이동 
  const moveToPage = (filter: string) => {
    if(filter === 'main') navigate('/')
    if(filter === 'bookmark') navigate('/bookmark')  
  }

  return (
    <GoogleOAuthProvider clientId='716214152050-hos6gdk3ckf321qg9b86sjkpb6b5mmes.apps.googleusercontent.com'>
      <header className={styles.header}>
          <div className={styles.header__logoBox} onClick={() => moveToPage('main')}>
              <img src='src/assets/images/image-logo.png' alt='' className={styles.header__logoBox__logo}/>
              <span className={styles.header__logoBox__title}>YoonSplash</span>
          </div>
          <div className={styles.header__profileBox}>
            {isLoggedIn ? (
              <>
              <button className={styles.header__profileBox__button}>사진 제출</button>
              <button className={styles.header__profileBox__button} onClick={() => moveToPage('bookmark')}>북마크</button>
              <span className={styles.header__profileBox__userName}>{user.name} | {user.email}</span>
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
  )
}

export default CommonHeader