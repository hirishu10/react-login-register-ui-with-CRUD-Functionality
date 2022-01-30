import React from "react";

function ReadModal(props: any) {
  const item = props.data;
  //
  const userId = item[0] === undefined || null || "" ? "" : item[0];
  const firstname = item[1] === undefined || null || "" ? "" : item[1];
  const lastname = item[2] === undefined || null || "" ? "" : item[2];
  const username = item[3] === undefined || null || "" ? "" : item[3];
  const emailID = item[4] === undefined || null || "" ? "" : item[4];
  const like = item[5] === undefined || null || "" ? "" : item[5];

  return (
    <div
      className="modal fade"
      id={"readModal"}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header  bg-secondary text-light">
            <h5 className="modal-title" id="exampleModalLabel">
              Read User
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/*  Body */}
            <div className="mb-3 row">
              {/* User Id */}
              <div className="input-group mt-2">
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
                  // readOnly={true}
                  disabled={true}
                  value={username}
                />
              </div>
              {/*  first name */}
              <div className="input-group mt-2">
                <span className="input-group-text">First Name:</span>
                <input
                  type="text"
                  aria-label="firstName"
                  className="form-control"
                  // readOnly={true}
                  disabled={true}
                  value={firstname}
                />
              </div>
              {/*  last name */}
              <div className="input-group mt-2">
                <span className="input-group-text">Last Name:</span>
                <input
                  type="text"
                  aria-label="lastName"
                  className="form-control"
                  // readOnly={true}
                  disabled={true}
                  value={lastname}
                />
              </div>
              {/*  emailID */}
              <div className="input-group mt-2">
                <span className="input-group-text">Email Id:</span>
                <input
                  type="email"
                  aria-label="emailId"
                  className="form-control"
                  value={emailID}
                  // readOnly={true}
                  disabled={true}
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
            {/* Body */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={(e) => {
                e.preventDefault();
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

export default ReadModal;
