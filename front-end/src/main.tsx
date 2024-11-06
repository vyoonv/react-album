import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  //<StrictMode> 이게 렌더링을 연속으로 하게 만듦
  <App />
  // </StrictMode>,
);
