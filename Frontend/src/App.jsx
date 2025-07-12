import React from "react";
import "./index.css";
import Auth from "./components/Auth";
import NavBar from "./components/NavBar";
import Feed from "./components/Feed";
import Body from "./components/Body";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import AppStore from "./utils/appStore";

const App = () => {
  return (
    <Provider store={AppStore}>
      <Router basename="/">
        <NavBar />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/user/auth" element={<Auth />} />
            <Route path="/user/feed" element={<Feed />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
