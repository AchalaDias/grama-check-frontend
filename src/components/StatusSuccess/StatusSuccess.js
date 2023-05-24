/* ----- StatusSuccess.js ----- */
import React from "react";
import "./StatusSuccess.scss";

// Assets
import StatusSuccessSVG from "../../assets/images/svg/success.svg";

// Components
import Button from "../../ui-library/Button/Button";
import Navbar from "../Navbar/Navbar";

// Libraries & Packages
import { Link } from "react-router-dom";

function StatusSuccess() {
   const API_HOST =
    "https://f82fbb50-01e1-4078-a9f8-0d4ed79a518a-dev.e1-us-east-azure.choreoapis.dev/sbmq/grama-check/requestservice-369/1.0.0";

  // Asgardeo access token
  const TOKEN = JSON.parse(
    sessionStorage.getItem("session_data-instance_0")
  ).access_token;
  const updateStatus = () => {
    console.log("Update Status");
  const email = JSON.parse(localStorage.getItem("user")).email;
  const requestId = JSON.parse(localStorage.getItem("requestId")).requestId;
    const url = API_HOST+"/request/"+requestId;
const requestStatus={
  requestId:requestId,
  status:"completed"
}
    var requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(requestStatus),
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Request status updated successfully");
          window.location.href = "/request-form";
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="statusSuccess">
      <div className="statusSuccess__container">
        <div className="getStrated__navbar">
          <Navbar />
        </div>
        <div className="statusSuccess__content">
          <div className="statusSuccess__content__image">
            <img src={StatusSuccessSVG} alt="" />
          </div>
          <div className="statusSuccess__content__title1">
            <p>STATUS : Success!</p>
          </div>
          <div className="statusSuccess__content__title2">
            <p>
              Your request for the document has been Approved by The grama
              niladari. You can download the document.
            </p>
          </div>
          <div className="statusSuccess__content__buttons">
            <Link to="/request-form">
              <Button variant="primary" onClick={updateStatus}>GO BACK</Button>
            </Link>
            <Link to="/">
              <Button variant="secondary"onClick={updateStatus}>DOWNLOAD</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusSuccess;
