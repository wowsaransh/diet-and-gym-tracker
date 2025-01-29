"use client";

import axios from "axios";
import Alert from "@/components/alert";
import { useState } from "react";

export default function Login() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSucess, setIsSuccess] = useState(false);
  const [userId, setUserId] = useState();

  const handleLogin = async () => {
    {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const res = await axios.post("http://localhost:5000/users/login", {
          username: username,
          password: password,
        });

        setAlertMessage(res.data.message);
        setShowAlert(true);
        setIsSuccess(res.status === 201);
        setUserId(res.data.id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAlert = () => {
    setShowAlert(false);
    if (isSucess) {
      localStorage.setItem("userId", userId);
      window.location.href = "/";
    }
  };
  return (
    <main className="auth">
      {showAlert && <Alert message={alertMessage} onAlert={handleAlert} />}
      <div className="box">
        <div className="inputs">
          <input type="text" id="username" placeholder="username" />
          <input type="password" id="password" placeholder="password" />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p>
          New user? <a href="/register">Register</a>
        </p>
      </div>
    </main>
  );
}
