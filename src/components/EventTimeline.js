import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EventTimeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    //axios.get("http://localhost:5000/events").then((res) => setEvents(res.data));
  }, []);

  return (
    <div className="timeline">
      <h2>📅 Event Timeline</h2>
      {events.map((event, index) => (
        <motion.div
          key={index}
          className="event-card"
          whileHover={{ scale: 1.1 }}
        >
          <h3>{event.title}</h3>
          <p>{event.time} - {event.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default EventTimeline;
