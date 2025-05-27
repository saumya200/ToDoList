import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      // const login = async () => {
      const response = await fetch("http://localhost:5283/api/ToDo/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        onLogin(data);
      } else {
        alert("Login failed : Please check your credentials!");
      }
      // };
    } catch (error) {
      console.error("Login error :", error);
      alert("An error occurred during login.");
    }
  };
  console.log("Hi");
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={() => handleSubmit()}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
