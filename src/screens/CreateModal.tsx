import React, { useState } from "react";
import { dbAuth } from "./Firebase";
import * as firestore from "firebase/firestore";

function CreateModal() {
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState(false);
  const [getEmailId, setEmailId] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [getUsername, setUsername] = useState("");
  const [getFirstname, setFirstname] = useState("");
  const [getLastname, setLastname] = useState("");
  const [changeColor, setChangeColor] = useState("");

  //
  /**
   * This helps to validate email
   * if user entered unvalid email
   */
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //

  const saveChangesNewUser = () => {
    if (
      getEmailId !== "" &&
      getFirstname !== "" &&
      getLastname !== "" &&
      getUsername !== "" &&
      checkEmail !== true
    ) {
      try {
        const mainCollection = firestore.collection(dbAuth, "user");
        const document = firestore.doc(mainCollection, `${getEmailId}`);
        firestore.setDoc(document, {
          firstName: getFirstname,
          lastName: getLastname,
          userName: getUsername,
          emailId: getEmailId,
          liked: false,
        });
        // console.log("Your data has been successfully added to our database");
        setEmailId("");
        setUsername("");
        setFirstname("");
        setLastname("");
        setChangeColor("");
        //
        setError(true);
        setThrowError(true);
      } catch (error) {
        // console.log("error :>> ", error);
        setError(true);
        setThrowError(true);
      }
    } else {
      // console.log("please fill the form carefully!");
      setError(true);
      setThrowError(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="createModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-light">
            <h5 className="modal-title" id="exampleModalLabel">
              Create User
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setEmailId("");
                setUsername("");
                setFirstname("");
                setLastname("");
                setError(false);
              }}
            ></button>
          </div>
          <div className="modal-body">
            {/*  */}
            <div
              className=" container-fluid text-light bg-danger mb-2"
              id="exampleModalContent"
              style={{
                textAlign: "center",
                height: 30,
                paddingTop: 6,
                borderRadius: 10,
              }}
            >
              <h6>Please refresh the page after adding User!</h6>
            </div>
            {/*  */}
            {/*  Body */}
            <div className="mb-3 row">
              <div className="input-group mt-2">
                {/*  */}
                {/* user id */}
                <span className="input-group-text">User Id:</span>
                <input
                  type="text"
                  aria-label="userId"
                  className="form-control"
                  // readOnly={true}
                  disabled={true}
                  value={getEmailId}
                />
              </div>
              {/*  user name */}
              <div className="input-group mt-2">
                <span className="input-group-text">User Name:</span>
                <input
                  type="text"
                  aria-label="userName"
                  className="form-control"
                  value={getUsername}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required={true}
                />
              </div>
              {/*  first name */}
              <div className="input-group mt-2">
                <span className="input-group-text">First Name:</span>
                <input
                  type="text"
                  aria-label="firstName"
                  className="form-control"
                  value={getFirstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  required={true}
                />
              </div>
              {/*  last name */}
              <div className="input-group mt-2">
                <span className="input-group-text">Last Name:</span>
                <input
                  type="text"
                  aria-label="lastName"
                  className="form-control"
                  value={getLastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  required={true}
                />
              </div>
              {/*  emailID */}
              <div className="input-group mt-2">
                <span className="input-group-text">Email Id:</span>
                <input
                  type="email"
                  className="form-control"
                  style={{
                    backgroundColor: changeColor ? changeColor : "white",
                  }}
                  aria-label="emailId"
                  value={getEmailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                    const c = validateEmail(getEmailId);
                    if (c === null) {
                      setError(true);
                      setCheckEmail(true);
                      setChangeColor("#ffc1ba");
                    } else {
                      setError(false);
                      setCheckEmail(false);
                      setChangeColor("#baffbc");
                    }
                  }}
                  required={true}
                />
              </div>
              {/*  */}
              {/* liked */}
              <div className="input-group mt-2">
                <span className="input-group-text">Like:</span>
                <input
                  type="text"
                  aria-label="liked"
                  className="form-control"
                  // readOnly={true}
                  disabled={true}
                  value={"false"}
                />
              </div>
              {/*  */}
            </div>
            {/*  */}
            {getError ? (
              <div
                className="card text-light"
                style={{
                  marginTop: 10,
                  display: "flex",
                  backgroundColor: throwError ? "#50865a" : "#cb444b",
                }}
              >
                <div className="card-body" style={{}}>
                  {throwError
                    ? "User successfully created!"
                    : "Something went wrong!"}
                </div>
                {/*  */}
                <div
                  className=""
                  style={{
                    width: 25,
                    height: 25,
                    textAlign: "center",
                    position: "absolute",
                    marginLeft: 440,
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
            {/* Body */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
              onClick={() => {
                setEmailId("");
                setUsername("");
                setFirstname("");
                setLastname("");
                setError(false);
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              // data-bs-dismiss="modal"
              onClick={(e) => {
                e.preventDefault();
                saveChangesNewUser();
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
