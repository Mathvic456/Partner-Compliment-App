import React, { useState } from "react";
import "./LoveReasonsGame.css";
import reasons from "./reasons.js";

const getTodaysReason = () => {
  const startDate = new Date("2025-01-01"); // Change to your start date
  const today = new Date();
  const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) % reasons.length;
  return reasons[diffDays];
};

const LoveReasonsGame = () => {
  const [todaysReason, setTodaysReason] = useState(getTodaysReason());
  const [extraReasons, setExtraReasons] = useState([]);

  const showMoreReasons = () => {
    const remainingReasons = reasons.filter((r) => !extraReasons.includes(r) && r !== todaysReason);
    if (remainingReasons.length > 0) {
      const randomReason = remainingReasons[Math.floor(Math.random() * remainingReasons.length)];
      setExtraReasons([...extraReasons, randomReason]);
    }
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="title">
          I know I'm away for a bit, so I wanted you to have 365 reasons why I love you and why I want to always come back to you ❤️
        </h1>
        <div className="reason-box">
          <p className="reason-text">{todaysReason}</p>
        </div>
        <button className="show-more-button" onClick={showMoreReasons}>
          Show Me More Reasons
        </button>
        <div className="extra-reasons">
          {extraReasons.map((reason, index) => (
            <div key={index} className="extra-reason-box">
              <p className="extra-reason-text">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveReasonsGame;
