import { useState } from "react";
import Login from "./login";
import SignUp from "./SignUp";

const Auth = () => {

    const [auth,SetAuth] = useState(true)

    const handleChange = (e)=>
        {
            const isChecked = e.target.checked;
            console.log("isChecked->",isChecked)
            SetAuth(isChecked)
        }

  return (
    <div className="flex flex-col justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-64 border p-4">
        <legend className="fieldset-legend">Login options</legend>
        <label className="label">
          <input type="checkbox" defaultChecked className="toggle" onChange={(e)=>handleChange(e)}/>
        </label>
      </fieldset>
      {auth ? <Login/>:<SignUp/>}
    </div>
  );
};

export default Auth;
