import { useState } from "react";
import "./styles/app.css";

import IntroScreen from "./components/IntroScreen";
import InstructionScreen from "./components/InstructionScreen";
import CharacterSelect from "./components/CharacterSelect";
import GameBoard from "./components/GameBoard";
import EndingQuestions from "./components/EndingQuestions";
import ReceiptScreen from "./components/ReceiptScreen";

import { hurdles } from "./data/gameData";
import { shuffleArray } from "./utils/helpers";

const ALL_PRIORITIES = ["AC", "AP", "FI", "PH", "SO"];

function App() {
  const [screen, setScreen] = useState("intro");

  const [character, setCharacter] = useState(null);

  const [priorities, setPriorities] = useState(
    shuffleArray([...ALL_PRIORITIES])
  );

  const [currentHurdle, setCurrentHurdle] = useState(0);

  const [receipt, setReceipt] = useState([]);

  const [bailed, setBailed] = useState(false);

  const [endingAnswers, setEndingAnswers] = useState({});

  const handleCharacterSelect = (piece) => {
    setCharacter(piece);
    setScreen("game");
  };

  const handleDecision = ({
    priority,
    consequence,
    accepted,
    commentary,
  }) => {
    const newEntry = {
      hurdle: hurdles[currentHurdle],
      priority,
      consequence,
      accepted,
      commentary,
    };

    setReceipt((prev) => [...prev, newEntry]);

    const remaining = priorities.filter(
      (p) => p !== priority
    );

    setPriorities(remaining);

    if (!accepted) {
      setBailed(true);
      setScreen("ending");
      return;
    }

    if (currentHurdle >= hurdles.length - 1) {
      setScreen("ending");
      return;
    }

    setCurrentHurdle((prev) => prev + 1);
  };

  const handleEndingSubmit = (answers) => {
    setEndingAnswers(answers);
    setScreen("receipt");
  };

  const resetGame = () => {
    setScreen("intro");

    setCharacter(null);

    setPriorities(
      shuffleArray([...ALL_PRIORITIES])
    );

    setCurrentHurdle(0);

    setReceipt([]);

    setEndingAnswers({});

    setBailed(false);
  };

  return (
    <div className="app-shell">

      {screen === "intro" && (
        <IntroScreen
          onStart={() =>
            setScreen("instructions")
          }
        />
      )}

      {screen === "instructions" && (
        <InstructionScreen
          onContinue={() =>
            setScreen("character")
          }
        />
      )}

      {screen === "character" && (
        <CharacterSelect
          onSelect={handleCharacterSelect}
        />
      )}

      {screen === "game" && (
        <GameBoard
          hurdle={hurdles[currentHurdle]}
          hurdleIndex={currentHurdle}
          character={character}
          priorities={priorities}
          onDecision={handleDecision}
        />
      )}

      {screen === "ending" && (
        <EndingQuestions
          bailed={bailed}
          onSubmit={handleEndingSubmit}
        />
      )}

      {screen === "receipt" && (
        <ReceiptScreen
          receipt={receipt}
          bailed={bailed}
          endingAnswers={endingAnswers}
          onReplay={resetGame}
        />
      )}

    </div>
  );
}

export default App;