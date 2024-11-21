// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function StartScreen({ startGame }) {
  return (
    <div className="start-screen">
      <h1>Sekwencja Pamięci</h1>
      <button onClick={startGame}>Start</button>
    </div>
  );
}

export default StartScreen;
