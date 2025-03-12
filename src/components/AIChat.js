import React, { useState } from "react";
// import { io } from "socket.io-client";  // Uncomment when backend is ready

// const socket = io("http://localhost:5000");  // Uncomment when backend is running

function AIChat() {
  const [messages, setMessages] = useState([]);

  // // Uncomment this when backend is ready
  // useEffect(() => {
  //   socket.on("message", (msg) => {
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });

  //   return () => {
  //     socket.disconnect();  // Cleanup when component unmounts
  //   };
  // }, []);

  return (
    <div>
      <h2>AI Chat Feature (Coming Soon)</h2>
      {/* Chat messages will be displayed here when backend is ready */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default AIChat;
