import { React,useEffect } from "react";
import { Outlet } from "react-router";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(addUser());
    }
  }, [dispatch]);
  return (
    <>
      <h2>Body Page</h2>
      <Outlet />
    </>
  );
};

export default Body;
