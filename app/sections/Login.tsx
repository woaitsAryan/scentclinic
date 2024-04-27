import React, { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import sha256 from "sha256";
import axios from "axios";
import Cookies from "js-cookie";
const Login = ({
  setLogin,
}: {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  async function handleLogin(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    try {
      if (!username) {
        toast.error("Username is required");
        return;
      }
      if (!password) {
        toast.error("Password is required");
        return;
      }
      const secretKey = sha256(password);
      const response = await axios.post("/api/check", {
        password: secretKey,
      });
      if (response.status === 200) {
        toast.success("Login Successful");
        Cookies.set("secretKey", secretKey);
        setTimeout(() => {
          setLogin(true);
        }, 1000);
      }
    } catch (error) {
      toast.error("Invalid Password or Username");
    }
  }
  return (
    <div className="w-full min-h-screen bg-[rgba(255,255,255,0.2)] backdrop-blur-lg z-[1000] fixed top-0 left-0 flex items-center justify-center">
      <ToastContainer />
      <div className="w-[40%] h-fit p-8 rounded-md shadow-xl bg-white border-2 ">
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              required
              className="py-2 outline-none border-0 border-b-2"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Password</label>
            <input
              type="password"
              placeholder="Enter your username"
              name="password"
              required
              className="py-2 outline-none border-0 border-b-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-primary py-2 text-white rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
