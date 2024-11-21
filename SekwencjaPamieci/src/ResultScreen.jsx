// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function ResultScreen({ score, onRestart }) {
  return (
    <div className="result-screen">
      <h2>Gra zakończona!</h2>
      <p>Twój wynik: {score}</p>
      <button className="restart-button" onClick={onRestart}>
        Rozpocznij ponownie
      </button>
    </div>
  );
}

export default ResultScreen;
