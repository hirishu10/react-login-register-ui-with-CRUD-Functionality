import React, { useState } from "react";
import icon from "../images/top_log.png";
import loginImage from "../images/forgot.jpg";
import { useNavigate } from "react-router-dom";
import { auth, dbAuth } from "./Firebase";
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";

function ForgotPassword() {
  const navigate = useNavigate();
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [subClick, setSubClick] = useState(false);

  const [getVerifiedEmail, setVerifiedEmail] = useState("");
  const [getNewPassword, setNewPassword] = useState("PASSWORD");

  const restPassword = async () => {
    if (getVerifiedEmail !== "") {
      setSubClick(true);
      try {
        const mainCollection = firestore.collection(dbAuth, "user");
        const document = firestore.doc(mainCollection, `${getVerifiedEmail}`);
        const access = await firestore.getDoc(document);
        if (access.exists()) {
          firebaseAuth
            .sendPasswordResetEmail(auth, getVerifiedEmail)
            .then((val) => {
              // console.log("val :>> ", val);
              // console.log("Mail Send");
              setError(true);
              setThrowError("Mail Send please check!");
              setSubClick(false);
            })
            .catch((err) => {
              // console.log("err", err);
              setSubClick(false);
              setError(true);
              setThrowError("Something went wrong!");
            });
          // console.log("access :>> ", access.data());
          setVerifiedEmail("");
        } else {
          setSubClick(false);
          setError(true);
          setThrowError("Sorry Your Email Id is not registered yet!");
          // console.log("Sorry Your Email Id is not registered yet!");
          setVerifiedEmail("");
        }
      } catch (error) {
        // console.log("error :>> ", error);
      }
    } else {
      // console.log("Please enter the email!");
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
        <h1 className="text-center">Forgot Password</h1>
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
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset className="">
              <div className="mb-3">
                <label htmlFor="forgotEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control mb-4"
                  id="forgotEmail"
                  aria-describedby="emailHelp"
                  required={true}
                  value={getVerifiedEmail}
                  onChange={(e) => {
                    setVerifiedEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-0">
                <label htmlFor="forgotPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="forgotPassword"
                  disabled={true}
                  value={getNewPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className=" mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    // e.preventDefault();
                    restPassword();
                  }}
                  disabled={subClick}
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
                  Already have account?
                </span>
                <a
                  href="login"
                  onClick={() => {
                    navigate("/");
                  }}
                  className=" ms-1 text-primary"
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    marginTop: 20,
                  }}
                >
                  Click here to Login
                </a>
              </div>
            </fieldset>
          </form>
          {/*  */}
          {getError ? (
            <div
              className="card bg-danger text-light"
              style={{ marginTop: 10, display: "flex" }}
            >
              <div className="card-body" style={{}}>
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

export default ForgotPassword;
