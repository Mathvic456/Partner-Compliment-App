import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const compliments = [
        "🌟 You're amazing!",
        "☀️ You're the best drama I want!",
        "💪 You're stronger than you know.",
        "👍 You're doing so well, keep it up!",
        "✨ You make the world brighter!",
        "💖 You’re one of a kind, and I love you for it.",
        "🌼 You bring out the best in everyone.",
        "😊 Your smile is contagious!",
        "❤️ You have a beautiful heart.",
        "🌈 You inspire me every day.",
        "You are the best nurse ever.",
        "You are the best Project Manager ever"
    ];

    const [currentCompliment, setCurrentCompliment] = useState("");
    const [fade, setFade] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [name, setName] = useState("");
    const [snack, setSnack] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const savedCompliment = localStorage.getItem('currentCompliment');
        if (savedCompliment) {
            setCurrentCompliment(savedCompliment);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (name.trim().toLowerCase() === 'gift') {
            setIsAuthenticated(true);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 30000); // Message shown for 3 seconds
        } else {
            alert("Access denied! Please enter the correct name.");
        }
    };

    const getRandomCompliment = () => {
        if (!isAuthenticated) return;

        setFade(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * compliments.length);
            const newCompliment = compliments[randomIndex];
            setCurrentCompliment(newCompliment);
            localStorage.setItem('currentCompliment', newCompliment);
            setFade(false);
        }, 300);
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                <form onSubmit={handleLogin} className="login-form">
                    <h1>Welcome! Please enter your details:</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                    />
                    <input
                        type="text"
                        value={snack}
                        onChange={(e) => setSnack(e.target.value)}
                        placeholder="Your Favorite Snack"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    {showMessage && (
                        <h2 className="animation-message">Victor thought about how to make you smile abit since you were having such a rough day today and he decided to let you know what he thinks about you. He hopes these thoughts put a smile on your beautiful dark skineed face</h2>
                    )}
                    <h1>Cheer Up with a Compliment!</h1>
                    <button onClick={getRandomCompliment}>Get a Compliment!</button>
                    <div>
                        <h2 className={fade ? 'fade' : ''}>{currentCompliment}</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
