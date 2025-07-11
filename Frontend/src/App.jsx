import React from "react";
import "./index.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Body from "./components/Body";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
        </Route>
          <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
