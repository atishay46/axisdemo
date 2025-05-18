import React from "react";
import Header from "./components/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="glow-box">
        <h1>Welcome to the Futuristic Tech Fest 🚀</h1>
        <p>Stay tuned for event details, AI chat, and more!</p>
      </div>
      <button>Explore More</button>
    </div>
  );
}

export default App;
