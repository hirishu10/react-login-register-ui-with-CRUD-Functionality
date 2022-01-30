import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import * as firebaseAuth from "firebase/auth";

function Splash() {
  const navigate = useNavigate();

  /**
   * Here we can check that user loged in or not
   * if login then it will redirect to the home page!
   * otherwise it will show login screen
   */
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (user != null) {
        // console.log("you are logged in");
        setTimeout(() => {
          // console.log("Going HomeScreen");
          navigate("/home");
        }, 1000);
      } else {
        // console.log("you are not logged in");
        navigate("/login");
      }
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <>
      <div
        style={{
          // backgroundColor: "#282c34",
          backgroundColor: "whitesmoke",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "calc(10px + 2vmin)",
          color: "grey",
          paddingTop: 200,
        }}
      >
        <h1>react-login-register-ui</h1>
        {/*  */}
        <div
          className="d-flex justify-content-cente"
          style={{ marginTop: 200 }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Splash;
