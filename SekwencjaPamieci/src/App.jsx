import { useState } from "react";
import GameBoard from "./GameBoard";
import ResultScreen from "./ResultScreen";
import "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
  };

  const endGame = (finalScore) => {
    setGameStarted(false);
    setGameOver(true);
    setScore(finalScore);
  };

  return (
    <div className="App">
      {!gameStarted && !gameOver && (
        <div className="start-screen">
          <h1>Sekwencja Pamięci</h1>
          <button onClick={startGame}>Start</button>
        </div>
      )}

      {gameStarted && <GameBoard onGameOver={endGame} />}

      {gameOver && <ResultScreen score={score} onRestart={startGame} />}
    </div>
  );
}

export default App;
