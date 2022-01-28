import React from "react";
import "./Home.css"

function Home() {
  return (
    <div className="home">
      <p>
        An MQTT broker is an intermediary entity that enables MQTT clients to
        communicate. Specifically, an MQTT broker receives messages published by
        clients, filters the messages by topic, and distributes them to
        subscribers.
      </p>
    </div>
  );
}

export default Home;
