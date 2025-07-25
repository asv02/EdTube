import { useEffect, useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { addSuggestion, removeUser } from "../utils/appSlice";
import {Link, useNavigate} from 'react-router'
import { BASE_URL } from "../utils/Constants";

const NavBar = () => {
  const [search, SetSearch] = useState("");
  const [suggestion,setSuggestion] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = async (query) => {
    const data = await fetch(
      "https://suggestqueries.google.com/complete/search?client=firefox&q=" +
        query
    );

    if (!data.ok) {
      throw new Error("Error while suggestion");
    }
    const res = await data.json();
    dispatch(addSuggestion({search:res[1]})) // for caching
    console.log("Suggestion response", res);
  };
  ///     Need to implement search algorithm  

  const handleLogout = async()=>
    {
       const data = await fetch(BASE_URL+'user/logout',
        {
          method:'POST',
          credentials:'include'
        })
        if(!data.ok)
          {
            console.log(`error in logging out!!`)
            return;
          }
          localStorage.clear()
          dispatch(removeUser())
          navigate('/user/auth')
    }


  useEffect(() => 
    {}, [search]);

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">EdTube</a>
      </div>

      <div className="navbar-center">
        <label className="input input-bordered flex items-center gap-2">
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
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => SetSearch(e.target.value)}
            className="w-40 md:w-64 lg:w-90"
          />
        </label>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <Link to='/user/chat'>Chat</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
