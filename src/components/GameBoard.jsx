import { useState } from 'react';
import PriorityHand from './PriorityHand';
import ConsequenceModal from './ConsequenceModal';
import QuestionModal from './QuestionModal';
import ProgressTracker from './ProgressTracker';
import '../styles/board.css';

function GameBoard({
    hurdle,
    character,
    priorities,
    onDecision,
    hurdleIndex,
}) {
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [showConsequence, setShowConsequence] = useState(false);

    return (
        <div className="board-screen fade-in">
            <div className="board-overlay">
                <ProgressTracker current={hurdleIndex} />
                <div className="hurdle-box"></div>
                <h2>{hurdle.title}</h2>
                <p>{hurdle.text}</p>

                <p className="warning-text"> To get something in this game, you must give something.</p>
            </div>
            <div className="player-section">
                <img className="player-piece" src={character} alt="character" />
            </div>

            <PriorityHand
                priorities={priorities}
                onSelect={(priority) => {
                    setSelectedPriority(priority);
                    setShowConsequence(true);
                }}
            />
        

            {showConsequence && (
                <ConsequenceModal
                    priority={selectedPriority}
                    onContinue={() => setShowConsequence(false)}
                    onSubmit={onDecision}
                />
            )}
        </div>
    );
}

export default GameBoard;