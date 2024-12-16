import React, { useState, useEffect } from "react";
import "./App.css";

// List of 30 programming languages and their respective colors
const languages = [
  { name: "JavaScript", color: "#F0DB4F", colorName: "Bright Yellow" },
  { name: "Python", color: "#306998", colorName: "Dark Blue" },
  { name: "Java", color: "#B07219", colorName: "Copper Brown" },
  { name: "C++", color: "#00599C", colorName: "Midnight Blue" },
  { name: "Ruby", color: "#701516", colorName: "Crimson Red" },
  { name: "Go", color: "#00ADD8", colorName: "Aqua Blue" },
  { name: "C#", color: "#178600", colorName: "Forest Green" },
  { name: "PHP", color: "#4F5D95", colorName: "Slate Purple" },
  { name: "Swift", color: "#F05138", colorName: "Sunset Orange" },
  { name: "TypeScript", color: "#3178C6", colorName: "Sky Blue" },
  { name: "Ruby on Rails", color: "#CC0000", colorName: "Fire Red" },
  { name: "Scala", color: "#DC322F", colorName: "Crimson Red" },
  { name: "Kotlin", color: "#7F52FF", colorName: "Lavender Purple" },
  { name: "Perl", color: "#0298C3", colorName: "Ocean Blue" },
  { name: "SwiftUI", color: "#F1B32F", colorName: "Golden Yellow" },
  { name: "Objective-C", color: "#1C1C1C", colorName: "Charcoal Black" },
  { name: "R", color: "#276DC3", colorName: "Royal Blue" },
  { name: "Lua", color: "#2C2D72", colorName: "Navy Blue" },
  { name: "Shell", color: "#89e051", colorName: "Lime Green" },
  { name: "Dart", color: "#00B4AB", colorName: "Turquoise Teal" },
  { name: "Rust", color: "#000000", colorName: "Deep Black" },
  { name: "Elixir", color: "#6E4A7E", colorName: "Plum Purple" },
  { name: "Haskell", color: "#5e5086", colorName: "Purple Violet" },
  { name: "GoLang", color: "#00A9E0", colorName: "Light Teal" },
  { name: "F#", color: "#F7A700", colorName: "Golden Yellow" },
  { name: "OCaml", color: "#3d85c6", colorName: "Light Blue" },
  { name: "Visual Basic", color: "#9458e3", colorName: "Vivid Violet" },
  { name: "VHDL", color: "#4e7c72", colorName: "Teal Green" },
  { name: "Hack", color: "#878787", colorName: "Ash Gray" },
  { name: "ActionScript", color: "#82B1FF", colorName: "Sky Blue" },
  { name: "Julia", color: "#a270bf", colorName: "Mauve Purple" },
  { name: "Tcl", color: "#E4CC70", colorName: "Pale Yellow" }
];

const App = () => {
  const [showLanguages, setShowLanguages] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [guessedLanguages, setGuessedLanguages] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState([]);
  const [userAnswer, setUserAnswer] = useState({ language: "", color: "" });

  // Timer to show languages initially for 4 seconds
  useEffect(() => {
    if (showLanguages) {
      setTimeout(() => setShowLanguages(false), 4000);
    }
  }, [showLanguages]);

  // Handle the language guess and check for correctness
  const handleGuess = () => {
    const { language, color } = userAnswer;
    const correctLanguage = languages.find(lang => lang.name === language);

    // If the language is incorrect or already used, mark as failed
    if (!correctLanguage || guessedLanguages.includes(language)) {
      setFailedAttempts(failedAttempts + 1);
      setResults(prev => [
        ...prev,
        {
          attempt: attempts + 1,
          language,
          status: "Failed",
          correctColor: correctLanguage?.colorName || "N/A"
        }
      ]);
      playSound(false);
    } else if (correctLanguage.colorName.toLowerCase() === color.toLowerCase()) {
      setResults(prev => [
        ...prev,
        {
          attempt: attempts + 1,
          language,
          status: "Success",
          correctColor: correctLanguage.colorName
        }
      ]);
      playSound(true);
    } else {
      setFailedAttempts(failedAttempts + 1);
      setResults(prev => [
        ...prev,
        {
          attempt: attempts + 1,
          language,
          status: "Failed",
          correctColor: correctLanguage.colorName
        }
      ]);
      playSound(false);
    }

    setAttempts(attempts + 1);
    setGuessedLanguages([...guessedLanguages, language]);
    setUserAnswer({ language: "", color: "" });
  };

  // Play success or failure sound
  const playSound = (isSuccess) => {
    const audio = new Audio(isSuccess ? "/success.wav" : "/fail.wav");
    audio.play();
  };

  // Check for game over condition
  useEffect(() => {
    if (failedAttempts >= 5 || attempts >= 20) {
      setGameOver(true);
    }
  }, [failedAttempts, attempts]);

  // Show game result table
  const renderResults = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Attempt Number</th>
            <th>Programming Language</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.attempt}</td>
              <td style={{ backgroundColor: result.correctColor }}>
                {result.language}
              </td>
              <td
                style={{
                  backgroundColor: result.status === "Success" ? "green" : "red",
                  color: "white"
                }}
              >
                {result.status === "Success" ? "✔️" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Display list of colors for guessing
  const colorOptions = languages.map((lang, idx) => lang.colorName);

  return (
    <div className="App">
      {showLanguages && !gameOver && (
        <div className="language-list">
          {languages.map((lang, idx) => (
            <div key={idx} style={{ backgroundColor: lang.color }}>
              {lang.name}
            </div>
          ))}
        </div>
      )}

      {!gameOver && !showLanguages && (
        <div>
          <input
            type="text"
            placeholder="Enter programming language"
            value={userAnswer.language}
            onChange={(e) => setUserAnswer({ ...userAnswer, language: e.target.value })}
          />
          <select
            value={userAnswer.color}
            onChange={(e) => setUserAnswer({ ...userAnswer, color: e.target.value })}
          >
            <option value="">Select color</option>
            {colorOptions.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
          <button onClick={handleGuess}>Submit Guess</button>
        </div>
      )}

      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <p>Total Attempts: {attempts}</p>
          <p>Failed Attempts: {failedAttempts}</p>
          {renderResults()}
        </div>
      )}
    </div>
  );
};

export default App;
