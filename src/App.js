import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const compliments = [
        "🌟 You have an amazing ability to make everyone around you feel special. It’s one of the things I love most about you",
        "☀️ You are so strong and resilient. I’m always in awe of how you handle challenges with grace.",
        "💪 Your laughter brightens my day. It’s contagious and makes everything feel right.",
        "👍 You have a beautiful heart, and it shows in everything you do for others.",
        "✨ Your intelligence and passion for what you love are incredibly attractive. I admire that about you.",
        "💖 You have a unique way of seeing beauty in the little things. It makes life so much richer.",
        "🌼 I love sharing moments with you.",
        "😊 You have this irresistible charm that leaves me wanting more.",
        "❤️ The way you tease me just makes me want you even more; it’s like you know my weaknesses.",
        "🌈 Even miles apart, I can feel your energy; it’s like you’re my personal Wi-Fi signal.",
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
