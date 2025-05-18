import React, { useEffect, useState } from "react";
import axios from "axios";

const GuestSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
   // axios.get("http://localhost:5000/speakers").then((res) => setSpeakers(res.data));
  }, []);

  return (
    <div className="speakers">
      <h2>🎤 Guest Speakers</h2>
      {speakers.map((speaker, index) => (
        <div key={index} className="speaker-card">
          <h3>{speaker.name}</h3>
          <p>{speaker.topic}</p>
        </div>
      ))}
    </div>
  );
};

export default GuestSpeakers;
