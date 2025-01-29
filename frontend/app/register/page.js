"use client";

import axios from "axios";
import Alert from "@/components/alert";
import { useState } from "react";

export default function Register() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await axios.post("http://localhost:5000/users/register", {
        username: username,
        email: email,
        password: password,
      });

      setAlertMessage(res.data.message);
      setShowAlert(true);
      setIsSuccess(res.status === 201);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAlert = () => {
    setShowAlert(false);
    if (isSuccess) {
      window.location.href = "/login";
    }
  };

  return (
    <main className="auth">
      {showAlert && <Alert message={alertMessage} onAlert={handleAlert} />}
      <div className="box">
        <div className="inputs">
          <input type="text" id="username" placeholder="username" />
          <input type="email" id="email" placeholder="email" />
          <input type="password" id="password" placeholder="password" />
        </div>
        <button onClick={handleRegister}>Register</button>
        <p>
          Already a user? <a href="/login">Login</a>
        </p>
      </div>
    </main>
  );
}
