/* ----- Help.js ----- */
import React, { useState } from "react";
import "./Help.scss";

// Assets
import HelpSVG from "../../assets/images/svg/help.svg";

// Components
import Button from "../../ui-library/Button/Button";
import Navbar from "../Navbar/Navbar";

// Libraries & Packages
import InputTextArea from "../../ui-library/InputTextArea/InputTextArea";

function Help() {
  // State
  const [message, setMessage] = useState("");

  // Choreo base endpoint
  const API_HOST =
    "https://f82fbb50-01e1-4078-a9f8-0d4ed79a518a-dev.e1-us-east-azure.choreoapis.dev/sbmq/slack/slackapp-17a/1.0.0";

  // Asgardeo access token
  const TOKEN = JSON.parse(
    sessionStorage.getItem("session_data-instance_0")
  ).access_token;

  // Fucnctions
  const sendMessage = () => {
    var url = API_HOST + `/help/?user_message=${message}`;

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          setMessage("");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="help">
      <div className="help__container">
        <div className="getStrated__navbar">
          <Navbar />
        </div>
        <div className="help__content">
          <div className="help__content__container">
            <div className="help__content__wrapper">
              <div className="help__content__title">
                <p>Get Connected With Slack!</p>
              </div>
              <div className="help__content__subtitle">
                <p>
                  Connect the right people, find anything you need and automate
                  the rest. That's work in Slack, your productivity platform.
                </p>
              </div>

              <div className="help__content__details">
                <div className="help__content__details__content">
                  <div className="help__content__details__content__textarea">
                    <InputTextArea
                      placeholder="Enter Your Message"
                      height={10}
                      value={message}
                      setValue={setMessage}
                    />
                  </div>
                  <div className="help__content__details__content__button">
                    <Button variant="primary" onClick={sendMessage}>SUBMIT</Button>
                  </div>
                </div>
                <div className="help__content__details__image">
                  <img src={HelpSVG} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
