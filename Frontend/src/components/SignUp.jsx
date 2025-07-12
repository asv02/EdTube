import React, { useState } from "react";
import { BASE_URL } from "../utils/Constants";

const SignUp = () => {
  const [photoUrl, SetPhotoUrl] = useState("https://www.vectorstock.com/royalty-free-vector/avatar-photo-default-user-icon-picture-face-vector-48139643");
  const [firstName, SetFirstName] = useState("Akash");
  const [lastName, SetLastName] = useState("Suryavanshi");
  const [dob, SetDob] = useState("");
  const [gender, SetGender] = useState("Male");
  const [mobileNumber, SetMobileNumber] = useState("8090178921");
  const [email, SetEmail] = useState("akash01@gmail.com");
  const [password, SetPassword] = useState("Akash@123");

  const handleSignUp = async () => {
    const userData = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PhoneNumber: mobileNumber,
      Password: password,
      DateOfBirth: dob,
      Gender: gender,
      PhotoUrl: photoUrl,
    };
    const data = await fetch(BASE_URL + "user/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if(!data.ok)
      {
        throw new Error("Failed to sign up");
      }
    const response = await data.json();
    console.log("SignUp Response:", response);
  };

  return (
    <div className="flex justify-center my-2.5">
      <div className="card w-96 bg-base-200 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title">SignUp</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo</legend>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => SetPhotoUrl(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name?</legend>
            <input
              type="text"
              value={firstName}
              onChange={(e) => SetFirstName(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name?</legend>
            <input
              type="text"
              value={lastName}
              onChange={(e) => SetLastName(e.target.value)}
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Date of Birth</legend>
            <input
              type="date"
              value={dob}
              onChange={(e) => SetDob(e.target.value)}
              className="input"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="text"
              className="input"
              placeholder="Gender"
              value={gender}
              onChange={(e) => SetGender(e.target.value)}
              list="gender"
            />
            <datalist id="gender">
              <option value="Male"></option>
              <option value="Female"></option>
              <option value="Others"></option>
            </datalist>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Mobile Number</legend>
            <input
              type="text"
              className="input"
              value={mobileNumber}
              onChange={(e) => SetMobileNumber(e.target.value)}
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <label className="input validator">
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
                onChange={(e) => SetEmail(e.target.value)}
                placeholder="mail@site.com"
                required
              />
            </label>
          </fieldset>
          <div className="validator-hint hidden">Email address</div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <label className="input validator">
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
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength="8"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
          </fieldset>
          <p className="validator-hint hidden">Invalid credentials</p>
          <div className="justify-center card-actions m-1.5">
            <button className="btn btn-primary" onClick={handleSignUp}>SignUp</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
