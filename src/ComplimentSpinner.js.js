// src/ComplimentSpinner.js
import React, { useState, useEffect } from 'react';
import './ComplimentSpinner.css';

function ComplimentSpinner() {
  // Compliments tailored to Gift's nursing and caretaking skills
  const compliments = [
    "Your patients are so lucky to have someone as caring as you.",
    "You have the most compassionate heart, and it shows in your work.",
    "The way you care for others is inspiring.",
    "Your dedication to helping others is truly admirable.",
    "You make the world a better place with your kindness and skills.",
    "Your patience and empathy make you an amazing nurse.",
    "You brighten up every room you enter, both at home and at work.",
    "Your ability to heal and care for others is a true gift.",
    "You are the reason many people get better and smile again.",
    "Your hard work and dedication make a difference in so many lives."
  ];

  const [compliment, setCompliment] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem('complimentHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('complimentHistory', JSON.stringify(history));
  }, [history]);

  const handleSpin = () => {
    setIsSpinning(true);
    setCompliment('');
    setShowReplyBox(false);
    setReply('');

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * compliments.length);
      const selectedCompliment = compliments[randomIndex];
      setCompliment(selectedCompliment);
      setShowReplyBox(true);
      setIsSpinning(false);
    }, 1000); // 1 second spin
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleSaveReply = () => {
    if (reply.trim() === '') return; // Do not save empty replies

    const newEntry = {
      compliment,
      reply
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    setReply('');
    setShowReplyBox(false);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      localStorage.removeItem('complimentHistory');
    }
  };

  return (
    <div className="spinner-container">
      <h2>Hey Gift, Victor did this for you 💖</h2>
      <button
        className={`spin-button ${isSpinning ? 'spinning' : ''}`}
        onClick={handleSpin}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin for a Compliment'}
      </button>

      {compliment && (
        <div className="compliment-section">
          <p className="compliment">{compliment}</p>
          {showReplyBox && (
            <div className="reply-box">
              <textarea
                value={reply}
                onChange={handleReplyChange}
                placeholder="Write your reply here..."
                rows="3"
              ></textarea>
              <button className="save-reply-button" onClick={handleSaveReply}>
                Save Reply
              </button>
            </div>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h3>History</h3>
          <button className="clear-history-button" onClick={handleClearHistory}>
            Clear History
          </button>
          <ul className="history-list">
            {history.map((entry, index) => (
              <li key={index} className="history-item">
                <p className="history-compliment">💖 {entry.compliment}</p>
                {entry.reply && <p className="history-reply">📝 {entry.reply}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ComplimentSpinner;
