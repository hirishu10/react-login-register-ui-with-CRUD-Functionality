import React, { useState } from "react";
import { dbAuth } from "./Firebase";
import * as firestore from "firebase/firestore";
import UpdateModal from "./UpdateModal";
import ReadModal from "./ReadModal";
import CreateModal from "./CreateModal";

function EachData(props: any) {
  const arrayMode: any[] = props.arrayMode;
  const [eachData, setEachData] = useState(arrayMode);
  const [pushIndex, setPushIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  //
  /**
   * Deleting User from the database
   */
  const deleteUser = (index: number) => {
    if (eachData.length > 2) {
      try {
        const getaccess = prompt("Are you sure want to delete?", "yes");
        if (getaccess?.toLowerCase() === "yes") {
          setEachData([]);
          setLoading(true);
          setLoadingMessage("Deleting the User please wait.....");
          const mainCollection = firestore.collection(dbAuth, "user");
          const document = firestore.doc(
            mainCollection,
            `${eachData[index][0]}`
          );
          firestore
            .deleteDoc(document)
            .then((res) => {
              setEachData([]);
              // console.log("res :>> ", res);
              // console.log("Data sucessfully deleted from database");
              setLoading(false);
              //
              const mainCollection = firestore.collection(dbAuth, "user");
              const retrieveData: Array<any> = [];
              firestore.onSnapshot(mainCollection, (snapshot) => {
                snapshot.forEach((item) => {
                  retrieveData.push([
                    item.id,
                    item.get("firstName"),
                    item.get("lastName"),
                    item.get("userName"),
                    item.get("emailId"),
                    item.get("liked"),
                  ]);
                });
                //
                setEachData(retrieveData);
              });
              //
            })
            .catch((err) => {
              setEachData([]);
              // console.log("eachData :>> ", eachData);
              // console.log("err :>> ", err);
              // console.log("Somthing went wrong while deleting the doc!");
              // console.log("eachData :>> ", eachData);
            });
        } else {
          // console.log("Ok data not deleted!");
        }
      } catch (error) {
        setEachData([]);
        // console.log("error :>> ", error);
        // console.log("Somthing went wrong while deleting the doc!");
        // console.log("eachData :>> ", eachData);
      }
    } else {
      alert("You can't delete last 2 data");
    }
  };

  //
  /**
   * Updating like for User
   */
  const likeUser = (index: number) => {
    setEachData([]);
    setLoading(true);
    setLoadingMessage("❤️💙 Updating the User please wait..... 💙❤️");
    try {
      const mainCollection = firestore.collection(dbAuth, "user");
      const document = firestore.doc(mainCollection, `${eachData[index][0]}`);
      firestore
        .updateDoc(document, {
          liked: !eachData[index][5],
        })
        .then((res) => {
          // console.log("res :>> ", res);

          //
          const mainCollection = firestore.collection(dbAuth, "user");
          const retrieveData: Array<any> = [];
          firestore.onSnapshot(mainCollection, (snapshot) => {
            snapshot.forEach((item) => {
              retrieveData.push([
                item.id,
                item.get("firstName"),
                item.get("lastName"),
                item.get("userName"),
                item.get("emailId"),
                item.get("liked"),
              ]);
            });
            //
            setEachData(retrieveData);
          });
          setLoading(false);
        })
        .catch((err) => {
          setEachData([]);
          // console.log("err :>> ", err);
          // console.log("Somthing went wrong while updating the doc!");
        });
    } catch (error) {
      setEachData([]);
      // console.log("error :>> ", error);
      // console.log("Somthing went wrong while deleting the doc!");
    }
  };

  return (
    <>
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
          {loadingMessage}
        </div>
      ) : (
        eachData.map((item: string, index: number) => {
          let bg = item[5] ? "red" : "dodgerblue";
          return (
            // Main Div
            <div className="container-fluid mainDiv mt-1" key={index}>
              {/* First Div */}
              <div className="firstDiv">
                {/* First-One */}
                <div className="first-one border pt-1">
                  <div
                    className="text-end"
                    style={{ width: "25%", color: "#665e5e" }}
                  >{`UserID:`}</div>
                  <div
                    className="ps-2"
                    style={{ width: "75%", overflow: "auto" }}
                  >{` ${item[0]}`}</div>
                </div>
                {/* First-One */}
                {/*  */}
                {/* First-Two */}
                <div className="first-two border pt-1">
                  <div
                    className="text-end"
                    style={{ width: "30%", color: "#665e5e" }}
                  >{`User Name:`}</div>
                  <div
                    className="ps-2"
                    style={{ width: "70%" }}
                  >{` ${item[3]}`}</div>
                </div>
                {/* First-Two */}
                {/*  */}
                {/* First-Three */}
                <div className="first-three border pt-1">
                  <div
                    className=" text-end"
                    style={{ width: "30%", color: "#665e5e" }}
                  >{`First Name:`}</div>
                  <div
                    className=" ps-2"
                    style={{ width: "70%" }}
                  >{` ${item[1]}`}</div>
                </div>
                {/* First-Three */}
                {/*  */}
                {/* First-Four */}
                <div className="first-four border pt-1">
                  <div
                    className="text-end"
                    style={{ width: "30%", color: "#665e5e" }}
                  >{`Last Name:`}</div>
                  <div className="ps-2" style={{ width: "70%" }}>
                    {` ${item[2]}`}
                  </div>
                </div>
                {/* First-Four */}
                {/*  */}
              </div>
              {/*  */}
              {/* ------------------------------------------------------- */}
              {/* Second DIV */}
              {/*  */}
              <div className="secondDiv">
                {/* Second-One */}
                <div className="second-one border pt-2">
                  <div
                    className="text-end"
                    style={{ width: "32%", color: "#665e5e" }}
                  >{`Full Name:`}</div>
                  <div
                    className="ps-2"
                    style={{ width: "68%", overflow: "auto" }}
                  >{` ${item[1]} ${item[2]}`}</div>
                </div>
                {/* Second-One */}
                {/*  */}
                {/* Second-Two */}
                <div className="second-two border pt-2">
                  <div
                    className="text-end"
                    style={{ width: "18%", color: "#665e5e" }}
                  >{`Email:`}</div>
                  <div
                    className="ps-2"
                    style={{ width: "82%" }}
                  >{` ${item[4]}`}</div>
                </div>
                {/* Second-Two */}
                {/*  */}
                {/* Second-Three */}
                <div className="second-three border text-center">
                  <div
                    className=""
                    style={{
                      width: "20%",
                      height: 38,
                    }}
                  >
                    {/* Create Modal */}
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#createModal"
                      style={{ fontWeight: "bold" }}
                      onClick={(e) => {
                        e.preventDefault();
                        // console.log("index", index);
                      }}
                    >
                      Create
                    </button>
                    <CreateModal />
                  </div>
                  <div className="" style={{ width: "20%", height: 38 }}>
                    {/* Read Modal */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#readModal"
                      style={{ fontWeight: "bold" }}
                      onClick={(e) => {
                        e.preventDefault();
                        // console.log("index", index);
                        setPushIndex(index);
                      }}
                    >
                      Read
                    </button>
                    <ReadModal data={eachData[pushIndex]} />
                  </div>
                  <div className="" style={{ width: "20%", height: 38 }}>
                    {/* Update Modal */}
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                      style={{ fontWeight: "bold" }}
                      onClick={(e) => {
                        e.preventDefault();
                        // console.log("index", index);
                        setPushIndex(index);
                      }}
                    >
                      Update
                    </button>
                    <UpdateModal data={eachData[pushIndex]} />
                    {/*  */}
                  </div>
                  <div className="" style={{ width: "20%", height: 38 }}>
                    {/* Delete User */}
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ fontWeight: "bold" }}
                      onClick={(e) => {
                        e.preventDefault();
                        deleteUser(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="" style={{ width: "20%", height: 38 }}>
                    {/* Like User */}
                    <button
                      type="button"
                      className="btn btn-dark"
                      style={{ fontWeight: "bold" }}
                      onClick={(e) => {
                        e.preventDefault();
                        likeUser(index);
                      }}
                    >
                      {item[5] ? "Liked ❤️" : "Like 💙 "}
                    </button>
                    {/* 💙 ❤️*/}
                  </div>
                </div>
              </div>
              {/*  */}
              {/* ------------------------------------------------------- */}
              {/*  */}
              {/* Liked Color */}
              <div className="thirdDiv text-center">
                <div
                  className="third-one"
                  style={{
                    backgroundColor: bg,
                  }}
                ></div>
              </div>
              {/*  */}
            </div>
          );
        })
      )}
    </>
  );
}

export default EachData;
