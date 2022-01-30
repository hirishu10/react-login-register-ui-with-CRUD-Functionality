import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import "../App.css";
import * as firebaseAuth from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, dbAuth } from "./Firebase";
import * as firestore from "firebase/firestore";
import profileIcon from "../images/profile.png";

function ProfileSetting() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const [getEmailId, setEmailId] = useState(auth.currentUser?.email);
  const [loading, setLoading] = useState(true);
  const [getUserId, setUserId] = useState(auth.currentUser?.email);
  const [getUsername, setUsername] = useState("");
  const [getFirstname, setFirstname] = useState("");
  const [getLastname, setLastname] = useState("");
  const [getPhotoURL, setPhotoURL] = useState("");
  const [getDisplayName, setDisplayName] = useState(
    auth.currentUser?.displayName
  );
  const [getNewProfilePhoto, setNewProfilePhoto] = useState("");
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("Something went wrong!");
  const [changeColor, setChangeColor] = useState("danger");

  // const [currentUser, setCurrentUser] = useState(auth.currentUser);
  useEffect(() => {
    // console.log("ProfilePhotoURL :>> ", auth.currentUser?.photoURL);
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user != null) {
        navigate("/profile");
        setEmailId(auth.currentUser?.email);
        clearTimeout();
        if (
          getEmailId !== null ||
          getEmailId !== undefined ||
          getEmailId !== ""
        ) {
          try {
            const mainCollection = firestore.collection(dbAuth, "auth");
            const document = firestore.doc(mainCollection, `${getEmailId}`);
            firestore.getDoc(document).then((d) => {
              setUserId(auth.currentUser?.email);
              setDisplayName(auth.currentUser?.displayName);
              setUsername(d.get("userName"));
              setFirstname(d.get("firstName"));
              setLastname(d.get("lastName"));
              // console.log("auth :>> ", auth.currentUser);
              //
              //
              /**
               * Below code to get the profile photo from the auth database.
               */
              const mainCollection2 = firestore.collection(dbAuth, "auth");
              const document2 = firestore.doc(
                mainCollection2,
                `${auth.currentUser?.email}`
              );
              firestore
                .getDoc(document2)
                .then((v) => {
                  setPhotoURL(v.get("photoURL"));
                })
                .catch((err) => {
                  // console.log("err :>> ", err);
                });
              //
              //
            });

            setTimeout(() => {
              setLoading(false);
            }, 2000);
          } catch (error) {
            // console.log("error :>> ", error);
          }
        } else {
          // alert("Please back and agan visit this page!");
        }
      } else {
        navigate("/");
      }
    });
    return unsubscribe;
  }, [getEmailId, getNewProfilePhoto, loading, navigate]);

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

  const updateCurrentUserPhotoURL = () => {
    if (getNewProfilePhoto.length >= 15) {
      try {
        const mainCollection2 = firestore.collection(dbAuth, "auth");
        const document2 = firestore.doc(
          mainCollection2,
          `${auth.currentUser?.email}`
        );
        firestore.updateDoc(document2, {
          photoURL: getNewProfilePhoto,
        });

        setError(true);
        setChangeColor("success");
        setThrowError("Your profile photo succesfully updated!");
        // console.log("Your profile photo succesfully updated!");
        setNewProfilePhoto("");
        // console.log("UserUpdated :>> ", auth.currentUser);
      } catch (error) {
        // console.log("error", error);
        setError(true);
        setChangeColor("danger");
        setThrowError("Something went wrong");
        setNewProfilePhoto("");
      }
    } else {
      setError(true);
      setChangeColor("danger");
      setThrowError("Please provide valid URL");
      setNewProfilePhoto("");
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
                  href="home"
                  onClick={() => {
                    navigate("/");
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
              src={getPhotoURL !== "" ? getPhotoURL : profileIcon}
              width={45}
              height={45}
              alt={"displayImage"}
              style={{ cursor: "pointer", borderRadius: 30 }}
              onClick={() => {
                navigate("/profile");
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
              onClick={signOut}
            />
          </div>
        </div>
      </nav>
      {/* Profile Settings */}
      {/*  */}
      {/* --------------------------------------------------------------------------BODY------------------------------------------- */}
      <>
        <div className=" bg-danger text-light">
          <h2
            className=""
            style={{ marginLeft: 50, paddingTop: 20, display: "flex" }}
          >
            Profile Settings
            <p
              className="bg-primary text-light"
              style={{
                marginLeft: 5,
                width: 60,
                height: 30,
                fontSize: 15,
                paddingTop: 5,
                textAlign: "center",
                borderRadius: 15,
                overflow: "hidden",
              }}
            >
              {"Beta"}
            </p>
          </h2>
          <div className=" bg-warning" style={{ height: 10 }}></div>
        </div>
        {/*  */}
        <div className="jumbotron container-fluid mt-2">
          <h1 className="display-4">Hello, User!</h1>
          <p className="lead">
            This is a simple CRUD App (Create, Read, Update and Delete) with
            login-register-ui.
          </p>
          <hr className="my-4" />
          <p>
            React-login-register-ui and CRUD functionality with the help of
            Firebase, React, CSS, Bootstrap, JavaScript.
          </p>
          <p className="lead">
            <a
              className="btn btn-primary btn-lg"
              href="https://github.com/hirishu10/"
              target="_blank"
              rel="noreferrer"
              role="button"
            >
              Learn more
            </a>
          </p>
        </div>
        {/*  */}
        {/* Like Form */}
        <div
          className="container w-50 p-lg-2 row g-3 mb-5"
          style={{ margin: "auto", marginTop: 20 }}
        >
          {/*  */}
          {loading && loading ? (
            <div
              className="container-fluid text-center"
              style={{
                height: 40,
                paddingTop: 8,
                width: "100%",
                alignItems: "center",
                transition: "0.8s",
              }}
            >
              {/* loading spinner */}
              <div
                className="spinner-border text-dark spinner-border-sm me-1"
                role="status"
              >
                {/* loading spinner */}
                <span className="visually-hidden"></span>
              </div>
              {`🔍 Getting Your 👨🏼‍💻 Profile.....`}
            </div>
          ) : (
            <>
              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">
                  User Id
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userId"
                  autoComplete="off"
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                  value={getUserId ? getUserId : "Error"}
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="usernamme" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={getUsername ? getUsername : "Current User"}
                  required={true}
                />
              </div>
              {/*  */}
              <div className="col-md-6">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  autoComplete="off"
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  value={getFirstname ? getFirstname : "Current User"}
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  autoComplete="off"
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  value={getLastname ? getLastname : "Current User"}
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="emailId" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  autoComplete="off"
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                  value={getUserId ? getUserId : "Current User"}
                  required={true}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="displayname" className="form-label">
                  Display Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="displayname"
                  autoComplete="off"
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                  value={getDisplayName ? getDisplayName : "Current User"}
                  required={true}
                />
              </div>
              {/*  */}
              <label
                htmlFor="uploadImage"
                className="form-label bg-danger text-light rounded-pill"
              >
                Note: You can upload any image for testing
              </label>
              <div className="input-group mb-3">
                <button className="input-group-text" disabled={true}>
                  Add Link
                </button>
                <input
                  type="text"
                  className="form-control"
                  id="uploadImage"
                  autoComplete="off"
                  value={getNewProfilePhoto}
                  onChange={(e) => {
                    setNewProfilePhoto(e.target.value);
                  }}
                />
                <button
                  className="input-group-text btn btn-outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    updateCurrentUserPhotoURL();
                  }}
                >
                  Upload
                </button>
              </div>
              {/*  */}
              {getError ? (
                <div
                  className={`card text-light bg-${changeColor}`}
                  style={{ display: "flex" }}
                >
                  <div
                    className="card-body"
                    style={{
                      fontSize: 12,
                      // backgroundColor: changeColor ? changeColor : "#cb444b",
                    }}
                  >
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
                      marginLeft: 660,
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
            </>
          )}
          {/*  */}
        </div>
      </>
      {/*  */}
      {/*  */}
    </>
  );
}

export default ProfileSetting;
