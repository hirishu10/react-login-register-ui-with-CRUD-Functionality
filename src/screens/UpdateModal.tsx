import React, { useState } from "react";
import { dbAuth } from "./Firebase";
import * as firestore from "firebase/firestore";

function UpdateModal(props: any) {
  const item = props.data;
  const userId = item[0];
  const like = item[5];
  const getEmailId = item[0];
  //
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState(false);
  const [newEmailId, setEmailId] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [getUserName, setUserName] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [changeColor, setChangeColor] = useState("");
  //
  /**
   * Validation of email
   */
  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //

  const saveChangesUpdated = () => {
    //
    if (
      newEmailId !== "" &&
      getFirstName !== "" &&
      getLastName !== "" &&
      getUserName !== "" &&
      checkEmail !== true
    ) {
      try {
        const mainCollection = firestore.collection(dbAuth, "user");
        const document = firestore.doc(mainCollection, `${getEmailId}`);
        // const document = firestore.collection(mainDocument, `${getEmailId}`);
        firestore.updateDoc(document, {
          userName: getUserName,
          firstName: getFirstName,
          lastName: getLastName,
          emailId: newEmailId,
        });
        // console.log("Your data has been successfully added to our database");
        setUserName("");
        setFirstName("");
        setLastName("");
        setEmailId("");
        setChangeColor("");
        //
        setError(true);
        setThrowError(true);
      } catch (error) {
        console.log("error :>> ", error);
        setError(true);
        setThrowError(true);
      }
    } else {
      // console.log("please fill the form carefully!");
      setError(true);
      setThrowError(false);
    }
    //
  };
  //
  return (
    <div
      className="modal fade"
      id="updateModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-success text-light">
            <h5 className="modal-title" id="exampleModalLabel">
              Update User
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setEmailId("");
                setUserName("");
                setFirstName("");
                setLastName("");
                setError(false);
                setChangeColor("");
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
              <h6>Please refresh the page after updating data!</h6>
            </div>
            {/*  */}
            {/*  Body */}
            <div className="mb-3 row">
              <div className="input-group mt-2">
                {/*  */}
                <span className="input-group-text">User Id:</span>
                <input
                  type="text"
                  aria-label="userId"
                  className="form-control"
                  // readOnly={true}
                  disabled={true}
                  value={userId}
                />
              </div>
              {/*  user name */}
              <div className="input-group mt-2">
                <span className="input-group-text">User Name:</span>
                <input
                  type="text"
                  aria-label="userName"
                  className="form-control"
                  value={getUserName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
              {/*  first name */}
              <div className="input-group mt-2">
                <span className="input-group-text">First Name:</span>
                <input
                  type="text"
                  aria-label="firstName"
                  className="form-control"
                  value={getFirstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              {/*  last name */}
              <div className="input-group mt-2">
                <span className="input-group-text">Last Name:</span>
                <input
                  type="text"
                  aria-label="lastName"
                  className="form-control"
                  value={getLastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
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
                  value={newEmailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                    const c = validateEmail(newEmailId);
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
              {/* liked */}
              <div className="input-group mt-2">
                <span className="input-group-text">Like:</span>
                <input
                  type="text"
                  aria-label="liked"
                  className="form-control"
                  // readOnly={true}
                  disabled={true}
                  value={like}
                />
              </div>
              {/*  */}
            </div>
            {/* Error Page */}
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
                    ? "Data successfully updated!"
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
                setUserName("");
                setFirstName("");
                setLastName("");
                setEmailId("");
                setError(false);
                setChangeColor("");
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              // data-bs-dismiss="modal"
              onClick={(e) => {
                e.preventDefault();
                saveChangesUpdated();
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

export default UpdateModal;
