import React, { useState } from "react";
import { BASE_URL } from "../utils/Constants";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/appSlice";

const Login = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate()
  console.log("Login component rendered");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log(
        "Login clicked with email:",
        email,
        "and password:",
        password
      );
      const userData = {
        Email: email,
        Password: password,
      };
      const data = await fetch(BASE_URL + "user/emaillogin", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!data.ok) {
        throw new Error("Failed to login");
      }
      const response = await data.json();
      console.log("Login Response:", response);
      dispatch(addUser(response));
      localStorage.setItem('user',JSON.stringify(response))
      naviagate('/user/feed')
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center my-2.5">
      <div className="card w-96 bg-base-200 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <label className="input validator m-1.5">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@site.com"
              required
            />
          </label>
          <div className="validator-hint hidden">Email address</div>
          <label className="input validator m-1.5">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">Invalid credentials</p>
          <div className="justify-center card-actions m-1.5">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
