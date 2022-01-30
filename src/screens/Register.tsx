import React, { useState } from "react";
import icon from "../images/top_log.png";
import registerImage from "../images/register.png";
import { auth, dbAuth } from "./Firebase";
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import profileIcon from "../images/profile.png";

function Register() {
  const navigate = useNavigate();
  const [getError, setError] = useState(true);
  const [throwError, setThrowError] = useState(
    "Note: Please do not enter your personal data use random test data! :)"
  );
  const [subClick, setSubClick] = useState(false);
  //
  const [checkTerms, setCheckTerms] = useState("off");
  const [getEmailId, setEmailId] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getUsername, setUsername] = useState("");
  const [getFirstname, setFirstname] = useState("");
  const [getLastname, setLastname] = useState("");

  /**
   * Some Function
   */
  const register = () => {
    if (
      getEmailId !== "" &&
      getPassword !== "" &&
      getUsername !== "" &&
      getFirstname !== "" &&
      getLastname !== "" &&
      getPassword.length >= 6
    ) {
      setSubClick(true);
      /**
       * Creating the account with the Email and Password
       */
      firebaseAuth
        .createUserWithEmailAndPassword(auth, getEmailId, getPassword)
        .then((userValue) => {
          //
          /**
           * After creating account we can update the rest properties of the user!
           */
          firebaseAuth.updateProfile(userValue.user, {
            displayName: getUsername,
            photoURL: profileIcon,
          });
          /**
           * this below code helps to get the user have signup already or not if true then it will create the database rather than updating the same
           */
          //
          pushDataInDatabase();
          //add the user in firestore/databse

          // console.log("userValue :>> ", userValue);
          // console.log("Account Created Successfully");
          setSubClick(false);
          navigate("/");
        })
        //
        .catch((err) => {
          setSubClick(false);
          setError(true);
          // console.log("err :>> ", err);
          setThrowError(
            "Email Id is already registered with our account! Please try agian"
          );
          // console.log(
          //   "Either user have already registered or the email id is not valid!"
          // );
          //
        });
    } else {
      setSubClick(true);
      setError(true);
      setThrowError("Please fill the form carefully!");
      // console.log(new Error("please check the form carefully"));
      setSubClick(false);
    }
  };
  // --------------------------------
  const pushDataInDatabase = () => {
    try {
      //
      /**
       * This data send to the displaying database
       */
      const mainCollection = firestore.collection(dbAuth, "user");
      const document = firestore.doc(mainCollection, `${getEmailId}`);
      firestore.setDoc(document, {
        firstName: getFirstname,
        lastName: getLastname,
        userName: getUsername,
        emailId: getEmailId,
        liked: false,
      });
      //
      /**
       * Same data copy and move into auth database
       */
      const mainCollection2 = firestore.collection(dbAuth, "auth");
      const document2 = firestore.doc(mainCollection2, `${getEmailId}`);
      firestore.setDoc(document2, {
        firstName: getFirstname,
        lastName: getLastname,
        userName: getUsername,
        emailId: getEmailId,
        liked: false,
        photoURL:
          "https://raw.githubusercontent.com/hirishu10/my-assets/main/react-login-ui/profile.png",
      });
      //
      // console.log("Your data has been successfully added to our database");
    } catch (error) {
      // console.log("error :>> ", error);
    }
  };

  return (
    <>
      {/* logo */}
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
      {/* main container */}
      <div className="" style={{ justifyContent: "center", marginTop: 100 }}>
        {/* title */}
        <h1 className="text-center ">Create Account for Free!</h1>
        {/* registerPageImage */}
        <div className="container  text-center">
          <img
            src={registerImage}
            width={200}
            height={200}
            alt={"logoImage"}
            className="mt-4"
          />
          <div
            className=" container-fluid text-start"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {/*  */}
            {/* Error Message */}
            {getError ? (
              <div className=" w-50 card bg-danger text-light " style={{}}>
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
                    marginLeft: 600,
                    fontWeight: "bold",
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
            {/* Error Message */}
          </div>
        </div>
        {/*  */}
        {/* Form  */}
        <div
          className="container-fluid"
          style={{
            marginTop: 10,
            backgroundColor: "#fcfcfc",
          }}
        >
          <form
            className="container w-50 p-lg-2 "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <fieldset className="">
              {/* <legend> */}
              <div className="row g-3">
                {/* firstname */}
                <div className="col-md-6">
                  <label htmlFor="registerFirstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registerFirstName"
                    autoComplete="off"
                    maxLength={30}
                    onChange={(e) => setFirstname(e.target.value)}
                    required={true}
                  />
                </div>
                {/* lastname */}
                <div className="col-md-6">
                  <label htmlFor="registerLastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registerLastName"
                    autoComplete="off"
                    maxLength={30}
                    onChange={(e) => setLastname(e.target.value)}
                    required={true}
                  />
                </div>
                {/* username */}
                <div className="col-md-6">
                  <label htmlFor="registerUserName" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registerUserName"
                    autoComplete="off"
                    maxLength={20}
                    onChange={(e) => setUsername(e.target.value)}
                    required={true}
                  />
                </div>
                {/* password */}
                <div className="col-md-6">
                  <label htmlFor="registerPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="registerPassword"
                    autoComplete="off"
                    maxLength={30}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                  />
                  <div id="passwordHelpBlock" className="form-text">
                    Password should be more than 6 characters.
                  </div>
                </div>
                {/* email */}
                <div className="mb-0">
                  <label htmlFor="registerEmailId" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="registerEmailId"
                    autoComplete="off"
                    maxLength={60}
                    onChange={(e) => setEmailId(e.target.value)}
                    required={true}
                  />
                </div>
                {/* terms and condition */}
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="registerTermsCondition"
                      onChange={(e) => {
                        if (checkTerms === "off") {
                          setCheckTerms("on");
                        } else {
                          setCheckTerms("off");
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="registerTermsCondition"
                    >
                      Accept Terms & Condition
                    </label>
                  </div>
                  <p className="mt-2" style={{ fontSize: 12 }}>
                    *Terms of service (also known as terms of use and terms and
                    conditions, commonly abbreviated as TOS or ToS, ToU or T&C)
                    are the legal agreements between a service provider and a
                    person who wants to use that service. The person must agree
                    to abide by the terms of service in order to use the offered
                    service. Terms of service can also be merely a disclaimer,
                    especially regarding the use of websites. Vague language and
                    lengthy sentences used in the terms of use have brought
                    concerns on customer privacy and raised public awareness in
                    many ways.
                    <a
                      href="https://en.wikipedia.org/wiki/Terms_of_service"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Click to know more
                    </a>
                  </p>
                </div>
                {/* submit */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={(checkTerms === "off" ? true : false) || subClick}
                    onClick={register}
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
                    style={{ fontSize: 12, fontWeight: "bold" }}
                  >
                    Already have a account?
                  </span>
                  <a
                    href="login"
                    className=" ms-1 text-primary"
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      marginTop: 20,
                    }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Click to Login
                  </a>
                </div>
              </div>
              {/* </form> */}
              {/* </legend> */}
            </fieldset>
          </form>
        </div>
      </div>
      <div
        className="container-fluid text-center pt-3"
        style={{ paddingBottom: 10 }}
      >
        <p className=" mt-2">
          © 2022 - 20 Rishu Chowdhary (
          <a
            href="https://github.com/hirishu10"
            target="_blank"
            rel="noreferrer"
          >
            hirishu
          </a>
          ). All stuffs are free and you can use 🙂
        </p>
        {/* #Footer */}
        <div
          style={{
            backgroundColor: "#d9dee4",
            height: 1,
            width: 800,
            marginLeft: 300,
            marginTop: -10,
          }}
        ></div>
      </div>
    </>
  );
}

export default Register;
