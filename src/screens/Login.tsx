import React, { useState } from "react";
import icon from "../images/top_log.png";
import loginImage from "../images/login.png";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import * as firebaseAuth from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [subClick, setSubClick] = useState(false);
  const [getEmail, setEmail] = useState("");
  const [getPass, setPass] = useState("");

  /**
   * Below the function for login with the credentials
   */
  const goAhead = () => {
    if (getEmail !== "" && getPass !== "") {
      firebaseAuth
        .signInWithEmailAndPassword(auth, getEmail, getPass)
        .then((user) => {
          if (user) {
            // console.log("user :>> ", user);
            // console.log("Login Success");
            setSubClick(false);
            navigate("/");
          } else {
            setSubClick(false);
          }
        })
        .catch((err) => {
          setError(true);
          setThrowError("Sorry! User not Authorised / Wrong Credentials");
          setSubClick(false);
          // console.log("err :>> ", err);
          // console.log("Error occured while login in your account may be your account not exist please create one for free!");
        });
    } else {
      setError(true);
      setThrowError("Please Enter All Fields!");
      setSubClick(false);
    }
  };

  return (
    <>
      <img
        src={icon}
        width={100}
        height={70}
        alt={"logo"}
        style={{
          float: "right",
          marginTop: -80,
          marginRight: 20,
          borderRadius: 40,
        }}
      />
      <div className="" style={{ justifyContent: "center", marginTop: 100 }}>
        <h1 className="text-center ">react-login-register-ui</h1>
        <div className="container  text-center">
          <img
            src={loginImage}
            width={200}
            height={200}
            alt={"logoImage"}
            className="mt-4"
          />
        </div>
        {/* Form  */}

        <div className="container w-25 p-lg-2" style={{ marginTop: 10 }}>
          <form>
            <fieldset className="">
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control mb-4"
                  id="loginEmail"
                  aria-describedby="emailHelp"
                  autoComplete="off"
                  value={getEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required={true}
                />
              </div>
              {/*  */}
              <div className="mb-0">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  autoComplete="off"
                  value={getPass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  required={true}
                />
              </div>
              <div className=" mb-4">
                <a
                  onClick={() => {
                    navigate("/forgotpassword");
                  }}
                  href="forgotpassword"
                  className="text-primary float-end"
                  style={{ fontSize: 10, fontWeight: "bold", marginTop: 2 }}
                >
                  Forgot Password?
                </a>
              </div>
              {/*  */}
              <div className="">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={subClick}
                  onClick={(e) => {
                    setSubClick(true);
                    goAhead();
                  }}
                >
                  {subClick ? (
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  Submit
                </button>
                <span
                  className=" text-disabled ms-2"
                  style={{ fontSize: 10, fontWeight: "bold" }}
                >
                  Need a account?
                </span>
                <a
                  href="register"
                  onClick={() => {
                    navigate("/register");
                  }}
                  className=" ms-1"
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    marginTop: 20,
                    color: "#e1806d",
                  }}
                >
                  Create for Free
                </a>
              </div>
            </fieldset>
          </form>
          {/*  */}
          {/* If We get any Error 
          then we push the error card for the same */}
          {/*  */}
          {getError ? (
            <div
              className="card bg-danger text-light"
              style={{ marginTop: 10, display: "flex" }}
            >
              <div className="card-body" style={{ fontSize: 12 }}>
                {throwError}
              </div>
              {/*  */}
              <div
                className=""
                style={{
                  width: 25,
                  height: 25,
                  textAlign: "center",
                  position: "absolute",
                  marginLeft: 317,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setError(false);
                }}
              >
                x
              </div>
              {/*  */}
            </div>
          ) : null}
          {/*  */}
        </div>
      </div>
    </>
  );
}

export default Login;
