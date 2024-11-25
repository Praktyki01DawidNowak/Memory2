import { useState, useEffect } from "react";
import "./App.css";

// eslint-disable-next-line react/prop-types
function GameBoard({ onGameOver }) {
  const colors = [
    "red",
    "green",
    "purple",
    "orange",
    "blue",
    "black",
    "yellow",
    "cyan",
    "white",
  ];
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [round, setRound] = useState(1);
  const [showSequence, setShowSequence] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  const MAX_SEQUENCE_LENGTH = 10;

  useEffect(() => {
    if (round <= MAX_SEQUENCE_LENGTH) {
      const newSequence = [...sequence, randomColor()];
      setSequence(newSequence);
      setUserInput([]);
      setIsUserTurn(false);
      setShowSequence(true);
    } else {
      setIsGameCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    if (showSequence) {
      let timeouts = [];
      sequence.forEach((color, index) => {
        const timeoutShow = setTimeout(() => {
          const element = document.getElementById(`color-${index}`);
          if (element) element.style.opacity = "1";
        }, index * 1500);

        const timeoutHide = setTimeout(() => {
          const element = document.getElementById(`color-${index}`);
          if (element) element.style.opacity = "0";
        }, index * 1500 + 1000);

        timeouts.push(timeoutShow, timeoutHide);
      });

      const endTimeout = setTimeout(() => {
        setShowSequence(false);
        setIsUserTurn(true);
      }, sequence.length * 1500);

      timeouts.push(endTimeout);

      return () => timeouts.forEach(clearTimeout);
    }
  }, [showSequence, sequence]);

  const randomColor = () => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  };

  const handleColorClick = (color) => {
    if (!isUserTurn) return;

    const newUserInput = [...userInput, color];
    setUserInput(newUserInput);

    if (color !== sequence[newUserInput.length - 1]) {
      onGameOver(round - 1);
      return;
    }

    if (newUserInput.length === sequence.length) {
      setRound(round + 1);
      setIsUserTurn(false);
    }
  };

  if (isGameCompleted) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Gratulacje!</h1>
        <p>Ukończyłeś wszystkie 10 poziomów! Świetna robota!</p>
        <button onClick={() => onGameOver(MAX_SEQUENCE_LENGTH)}>
          Zakończ grę
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Sekwencja Pamięci - Runda {round}</h2>
      <div className="sequence-display">
        {sequence.map((color, index) => (
          <div
            key={index}
            id={`color-${index}`}
            style={{
              backgroundColor: color,
              width: "50px",
              height: "50px",
              margin: "5px",
              opacity: "0",
              transition: "opacity 0.5s",
            }}
          ></div>
        ))}
      </div>
      <div className="color-buttons">
        {colors.map((color) => (
          <button
            key={color}
            style={{
              backgroundColor: color,
              width: "70px",
              height: "70px",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => handleColorClick(color)}
            disabled={!isUserTurn}
          ></button>
        ))}
      </div>
      <p>
        Runda: {round}/{MAX_SEQUENCE_LENGTH}
      </p>
    </div>
  );
}

export default GameBoard;
