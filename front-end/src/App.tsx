import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
// 페이지 컴포넌트 
import MainPage from '@pages/index/index'
import BookmarkPage from '@pages/bookmark/index'
// 토스트 (ToastContainer는 App.tsx에 한 번만 추가해도 모든 곳에서 사용 가능 : message alert 푸터에 추가하는 느낌 / Router 바깥에 추가해야 함) 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

// 페이지 라우팅
function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<MainPage />}></Route>
          <Route path="/search/:id" element={<MainPage />}></Route>
          <Route path="/bookmark" element={<BookmarkPage />}></Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
