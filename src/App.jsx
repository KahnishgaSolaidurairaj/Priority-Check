import { useState } from 'react';
import './styles/app.css';

import IntroScreen from './components/IntroScreen';
import CharacterSelect from './components/CharacterSelect';
import GameBoard from './components/GameBoard';
import EndingQuestions from './components/EndingQuestions';
import ReceiptScreen from './components/ReceiptScreen';

import { hurdles } from './data/gameData';
import { shuffleArray, getRandomConsequence } from './utils/helpers';

const ALL_PRIORITIES = ['AC', 'AP', 'FI', 'PH', 'SO'];
function App() {
  const [screen, setScreen] = useState('intro');
  const [character, setCharacter] = useState(null);
  const [priorities, setPriorities] =
useState(shuffleArray([...ALL_PRIORITIES]));
  const [currentHurdle, setCurrentHurdle] = useState(0);
  const [receipt, setReceipt] = useState([]);
  const [bailed, setBailed] = useState(false);
  const [endingAnswers, setEndingAnswers] = useState({});
  
  const handleCharacterSelect = (piece) => {
    setCharacter(piece);
    setScreen('game');
  };

  const handleDecision = ({ priority, accepted, commentary }) => {
    const consequence = getRandomConsequence(priority);

    const entry = {
      hurdle: hurdles[currentHurdle],
      priority,
      consequence,
      accepted,
      commentary,
    };

    setReceipt((prev) => [...prev, entry]);

    const updated = priorities.filter((p) => p !== priority);
    setPriorities(updated);
    if (!accepted) {
      setBailed(true);
      setScreen('ending');
      return;
    }

    if (currentHurdle === hurdles.length - 1) {
      setScreen('ending');
    } else {
      setCurrentHurdle((prev) => prev + 1);
    }
  };

  const handleEndingSubmit = (answers) => {
    setEndingAnswers(answers);
    setScreen('receipt');
  };

  const resetGame = () => {
    setScreen('intro');
    setCharacter(null);
    setPriorities(shuffleArray([...ALL_PRIORITIES]));
    setCurrentHurdle(0);
    setReceipt([]);
    setBailed(false);
    setEndingAnswers({});
  };

  return (
    <div className="app-shell">
      {screen === 'intro' && (
        <IntroScreen onStart={() => setScreen('character')} />
      )}

      {screen === 'character' && (
        <CharacterSelect onSelect={handleCharacterSelect} />
      )}

      {screen === 'game' && (
        <GameBoard
          hurdle={hurdles[currentHurdle]}
          character={character}
          priorities={priorities}
          onDecision={handleDecision}
          hurdleIndex={currentHurdle}
        />
      )}

      {screen === 'ending' && (
        <EndingQuestions
          bailed={bailed}
          onSubmit={handleEndingSubmit}
        />
      )}

      {screen === 'receipt' && (
        <ReceiptScreen
          receipt={receipt}
          endingAnswers={endingAnswers}
          bailed={bailed}
          onReplay={resetGame}
        />
      )}
    </div>
  );
}

export default App;