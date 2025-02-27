import React, { useState, useEffect } from "react";
import "./LoveReasonsGame.css";

const reasons = [
  "You always make me smile no matter what.",
  "Your laugh is the most beautiful sound in the world.",
  "I love the way you support and believe in me.",
  "You give the best hugs, and they make everything better.",
  "You are the kindest person I know, and I love your heart."
  // Add 360 more reasons here
];

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
      <h1 className="title">365 Reasons Why I Love You ❤️</h1>
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
  );
};

export default LoveReasonsGame;
