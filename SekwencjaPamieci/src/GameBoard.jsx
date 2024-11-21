import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function GameBoard({ onGameOver }) {
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
    "brown",
  ];

  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [round, setRound] = useState(1);
  const [showSequence, setShowSequence] = useState(false);
  const [colorsVisible, setColorsVisible] = useState(true);
  const [isGameCompleted, setIsGameCompleted] = useState(false);

  const MAX_SEQUENCE_LENGTH = 10;

  useEffect(() => {
    if (round <= MAX_SEQUENCE_LENGTH) {
      if (round === 1) {
        setSequence([randomColor()]);
      } else {
        setSequence((prevSequence) => [...prevSequence, randomColor()]);
      }
      setUserInput([]);
      setIsUserTurn(false);
      setShowSequence(true);
    } else {
      setIsGameCompleted(true);
    }
  }, [round]);

  useEffect(() => {
    if (showSequence) {
      let timeoutIds = [];
      sequence.forEach((color, index) => {
        const timeoutId = setTimeout(() => {
          const displayColor = document.getElementById(`color-${index}`);
          if (displayColor) {
            displayColor.style.opacity = "1";
          }
        }, index * 1500);

        const hideTimeoutId = setTimeout(() => {
          const displayColor = document.getElementById(`color-${index}`);
          if (displayColor) {
            displayColor.style.opacity = "0";
          }
        }, index * 1500 + 1000);

        timeoutIds.push(timeoutId, hideTimeoutId);
      });

      const endTimeoutId = setTimeout(() => {
        setShowSequence(false);
        setColorsVisible(false);
        setIsUserTurn(true);
      }, sequence.length * 1500);

      timeoutIds.push(endTimeoutId);

      return () => timeoutIds.forEach(clearTimeout);
    }
  }, [showSequence, sequence]);

  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const handleColorClick = (color) => {
    if (isUserTurn) {
      setUserInput((prevInput) => [...prevInput, color]);

      if (color !== sequence[userInput.length]) {
        onGameOver(round - 1);
      } else if (userInput.length + 1 === sequence.length) {
        if (round < MAX_SEQUENCE_LENGTH) {
          setRound((prevRound) => prevRound + 1);
        } else {
          setIsGameCompleted(true);
        }
        setIsUserTurn(false);
        setColorsVisible(true);
      }
    }
  };

  if (isGameCompleted) {
    return (
      <div className="congratulations">
        <h1>Gratulacje!</h1>
        <p>Ukończyłeś wszystkie 10 poziomów! Świetna robota!</p>
        <button onClick={() => onGameOver(MAX_SEQUENCE_LENGTH)}>
          Zakończ grę
        </button>
      </div>
    );
  }

  return (
    <div className="game-board" style={{ textAlign: "center" }}>
      <h2>Sekwencja Pamięci - Runda {round}</h2>

      <div className="sequence-display">
        {colorsVisible &&
          sequence.map((color, index) => (
            <div
              key={index}
              id={`color-${index}`}
              className="color-box"
              style={{
                backgroundColor: color,
                width: "50px",
                height: "50px",
                margin: "5px",
                opacity: "0",
                transition: "opacity 0.5s ease",
              }}
            ></div>
          ))}
      </div>

      {}
      <div
        className="colors"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          maxWidth: "300px",
          margin: "20px auto",
          justifyItems: "center",
        }}
      >
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
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => handleColorClick(color)}
            disabled={!isUserTurn}
          ></button>
        ))}
      </div>

      <div className="round-info">
        Runda: {round}/{MAX_SEQUENCE_LENGTH}
      </div>
    </div>
  );
}

export default GameBoard;
