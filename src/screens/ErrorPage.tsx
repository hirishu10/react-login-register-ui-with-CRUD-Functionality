import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import "../App.css";
import * as firebaseAuth from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import profileIcon from "../images/profile.png";
import errorDesign from "../images/oops.jpeg";

function ErrorPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [getPhotoURL, setPhotoURL] = useState(auth.currentUser?.photoURL);
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

  /**
   * Here we can check that user loged in or not
   * if login then it will redirect to the home page!
   * otherwise it will show login screen
   */
  useEffect(() => {
    setPhotoURL(auth.currentUser?.photoURL);
    //
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setAccess(true);
      } else {
        setAccess(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const signOut = () => {
    const message = prompt(
      "Are you sure want to logout \nPlease type YES for Logout",
      "yes"
    );
    // console.log("message :>> ", message);
    if (message?.toLowerCase() === "yes") {
      firebaseAuth
        .signOut(auth)
        .then((value) => {
          // console.log("value :>> ", value);
          // console.log("Logged Out");
          navigate("/");
        })
        .catch((err) => {
          // console.log("err :>> ", err);
          // console.log("Error occured while logged out");
        });
    } else {
      alert("Ok you are not logout yet keep exploring :)");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-lg-top">
        <div className="container-fluid text-capitalize">
          <a
            className="navbar-brand"
            href="https://github.com/hirishu10/react-login-register-ui-with-CRUD-Functionality.git"
            target={"_blank"}
            rel="noreferrer"
          >
            react-login-register-ui
          </a>
          {/* If website responsive then it will create button for the Navbar */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href={access ? "/" : "login"}
                  onClick={() => {
                    access ? navigate("/") : navigate("/login");
                  }}
                >
                  Home
                </a>
              </li>
              {/* Later we add */}
              {/* <li className="nav-item">
                <a className="nav-link" href="">
                  Link
                </a>
              </li> */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="options"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Options
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="somethingone">
                      Something One
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="somethingtwo">
                      Something Two
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="somethingthree">
                      Something Three
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSDZBZqLQmBZkGzRTdXdPjTHjRTFrMHcctsXfMlTGrlVRdZscMrjZkKtFsxxgwwWBfRNmnnD"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  Suggestion
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="extra">
                  Extra
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-info" type="submit">
                Search
              </button>
              {/*  */}
            </form>
            <li className="d-flex">
              <a
                className="nav-link disabled"
                aria-current="page"
                href="welcome"
                style={{ color: "white" }}
              >
                {`Welcome, ${
                  auth.currentUser?.displayName
                    ? auth.currentUser?.displayName
                    : "User"
                }`}
              </a>
            </li>
            {/*  */}
            <div
              style={{
                display: "flex",
                width: 50,
                height: 25,
                marginRight: 20,
              }}
            >
              {/* above the main div */}
              <div
                className="circle-base"
                style={{
                  width: 50,
                  height: 25,
                  position: "absolute",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (darkMode) {
                    setDarkMode(false);
                  } else {
                    setDarkMode(true);
                  }
                }}
              >
                <div
                  className="shadow-circle"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 30,
                    paddingTop: 3,
                    marginTop: -3,
                    paddingLeft: 2,
                    paddingBottom: 2,
                    marginLeft: darkMode === false ? -2 : 25,
                  }}
                >
                  <div
                    className="back-circle"
                    style={{
                      backgroundColor: "#4d4d4d",
                      width: 23,
                      height: 23,
                      borderRadius: 80,
                      paddingLeft: 1,
                      paddingTop: 1,
                    }}
                  >
                    <div
                      className="circle"
                      style={{
                        width: 21,
                        height: 21,
                        backgroundColor: "white",
                        borderRadius: 80,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="" style={{ width: 50, height: 25 }}>
                <div
                  className=" me-3"
                  style={{
                    width: 50,
                    height: 23,
                    backgroundColor: "#4d4d4d",
                    borderRadius: 20,
                    display: "flex",
                  }}
                >
                  <p
                    style={{
                      width: 20,
                      height: 25,
                      textAlign: "center",
                    }}
                  >
                    🌜
                  </p>
                  <p
                    style={{
                      width: 30,
                      height: 25,
                      textAlign: "center",
                    }}
                  >
                    🌞
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <img
              src={getPhotoURL ? getPhotoURL : profileIcon}
              width={45}
              height={45}
              alt={"displayImage"}
              style={{ cursor: "pointer", borderRadius: 30 }}
              onClick={() => {
                access ? navigate("/profile") : navigate("/login");
              }}
            />
            <img
              src={
                "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAyMjYgMjI2Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwyMjZ2LTIyNmgyMjZ2MjI2eiIgZmlsbD0iIzIyMjUyOCI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik0xMTIuODU4NzUsOC44OTg3NWMtMzAuNzE3NzQsMCAtNTguMzc5NzUsMTMuNDIyMDMgLTc3LjM4NzM0LDM0LjY1MDM5Yy0yLjI2NzU1LDIuMzg3NjggLTMuMDU3NjMsNS44MTkzOSAtMi4wNjI0NCw4Ljk1ODI1YzAuOTk1MTksMy4xMzg4NiAzLjYxODI0LDUuNDg4NDIgNi44NDczLDYuMTMzMzhjMy4yMjkwNiwwLjY0NDk2IDYuNTUzNDMsLTAuNTE2NjkgOC42NzgwNCwtMy4wMzI0MWMxNS43MzMxMywtMTcuNTcxMzEgMzguNDU4NTksLTI4LjYyOTYxIDYzLjkyNDQ1LC0yOC42Mjk2MWM0Ny41Mzc0LDAgODUuODgsMzguMzQyNiA4NS44OCw4NS44OGMwLDQ3LjUzNzQgLTM4LjM0MjYsODUuODggLTg1Ljg4LDg1Ljg4Yy0yNS40NjA5MiwwIC00OC4xODYzNCwtMTEuMDU3MjkgLTYzLjkyNDQ1LC0yOC42Mjk2MWMtMi4xMjQ2MSwtMi41MTU3MyAtNS40NDg5OCwtMy42NzczOSAtOC42NzgwNCwtMy4wMzI0M2MtMy4yMjkwNywwLjY0NDk2IC01Ljg1MjEyLDIuOTk0NTMgLTYuODQ3MzEsNi4xMzMzOWMtMC45OTUxOCwzLjEzODg2IC0wLjIwNTEsNi41NzA1OCAyLjA2MjQ2LDguOTU4MjVjMTkuMDExNjQsMjEuMjI3MzYgNDYuNjczNywzNC42NTAzOSA3Ny4zODczNCwzNC42NTAzOWM1Ny4zMDg1MiwwIDEwMy45NiwtNDYuNjUxNDggMTAzLjk2LC0xMDMuOTZjMCwtNTcuMzA4NTIgLTQ2LjY1MTQ4LC0xMDMuOTYgLTEwMy45NiwtMTAzLjk2ek00OS42ODQ2OSw3Mi4wOTA0N2MtMi4zNDg1OCwwLjA2OTk4IC00LjU3NzY2LDEuMDUxNTQgLTYuMjE1LDIuNzM2NzJsLTMwLjgzNjY0LDMwLjgzNjY0Yy0yLjI1NjY0LDEuNzE0MjYgLTMuNTc4OSw0LjM4NzQ1IC0zLjU3MTk3LDcuMjIxMzZjMC4wMDY5NCwyLjgzMzkxIDEuMzQyMjcsNS41MDA2IDMuNjA3MjgsNy4yMDM3OWwzMC44MDEzMywzMC44MDEzM2MyLjI2NzM5LDIuMzYxNiA1LjYzNDMzLDMuMzEyOTEgOC44MDIzMiwyLjQ4NzA0YzMuMTY3OTksLTAuODI1ODcgNS42NDE5OCwtMy4yOTk4NiA2LjQ2Nzg1LC02LjQ2Nzg1YzAuODI1ODcsLTMuMTY3OTkgLTAuMTI1NDQsLTYuNTM0OTMgLTIuNDg3MDQsLTguODAyMzJsLTE2LjIwODQ0LC0xNi4yMDg0NGg4Mi4xMzY4OGMzLjI2MDE1LDAuMDQ2MTEgNi4yOTI1OCwtMS42NjY3NSA3LjkzNjExLC00LjQ4MjY5YzEuNjQzNTMsLTIuODE1OTQgMS42NDM1MywtNi4yOTg2OCAwLC05LjExNDYyYy0xLjY0MzUzLC0yLjgxNTk0IC00LjY3NTk2LC00LjUyODggLTcuOTM2MTEsLTQuNDgyNjloLTgyLjEzNjg3bDE2LjIwODQ0LC0xNi4yMDg0NGMyLjY3MzY3LC0yLjU5ODkyIDMuNDc3NTgsLTYuNTcyNjcgMi4wMjQzNywtMTAuMDA2NDljLTEuNDUzMjIsLTMuNDMzODEgLTQuODY1NDQsLTUuNjIzMjYgLTguNTkyNDksLTUuNTEzMzV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
              }
              width={25}
              height={25}
              alt={"displayImage"}
              style={{ cursor: "pointer", marginLeft: 10 }}
              onClick={() => {
                access ? signOut() : navigate("/");
              }}
            />
          </div>
        </div>
      </nav>
      {/*  */}
      {/* Error Page */}
      <div className="container-fluid text-center ">
        <h1 className="">404 Page Not Found!</h1>
        <div className="">
          <img
            src={errorDesign}
            title="Error-Page"
            alt="404 Error"
            className="error-photo"
            width="600"
            height="600"
          />
        </div>
      </div>
      {/*  */}
    </>
  );
}

export default ErrorPage;
