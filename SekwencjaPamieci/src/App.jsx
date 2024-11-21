import { useState } from "react";
import GameBoard from "./GameBoard";
import ResultScreen from "./ResultScreen";
import "./App.css"; // upewnij się, że plik CSS jest zaimportowany

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Rozpoczęcie gry
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false); // Resetowanie stanu gry
    setScore(0); // Resetowanie wyniku
  };

  // Funkcja kończąca grę (wywoływana, gdy gra się skończy)
  const endGame = (finalScore) => {
    setGameStarted(false);
    setGameOver(true);
    setScore(finalScore); // Ustawienie końcowego wyniku
  };

  return (
    <div className="App">
      {!gameStarted && !gameOver && (
        <div className="start-screen">
          <h1>Sekwencja Pamięci</h1>
          <button onClick={startGame}>Start</button>
        </div>
      )}

      {gameStarted && !gameOver && <GameBoard onGameOver={endGame} />}

      {gameOver && <ResultScreen score={score} onRestart={startGame} />}
    </div>
  );
}

export default App;
