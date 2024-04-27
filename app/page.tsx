"use client";
import { useEffect, useState } from "react";
import Editor from "./editor/page";
import Login from "./sections/Login";
import Cookies from "js-cookie";
export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (Cookies.get("secretKey")) {
      setIsLogin(true);
    }
  }, []);
  return (
    <div className="bg-base">
      {!isLogin && <Login setLogin={setIsLogin} />}
      <Editor />
    </div>
  );
}
