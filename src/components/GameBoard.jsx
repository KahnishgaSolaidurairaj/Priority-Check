import { useState } from "react";

import PriorityHand from "./PriorityHand";
import ConsequenceModal from "./ConsequenceModal";
import ProgressTracker from "./ProgressTracker";

import "../styles/board.css";

function GameBoard({
    hurdle,
    character,
    priorities,
    onDecision,
    hurdleIndex,
}) {
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [showConsequenceModal, setShowConsequenceModal] = useState(false);

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
    setShowConsequenceModal(true);
  };

  const handleCloseModal = () => {
    setShowConsequenceModal(false);
    setSelectedPriority(null);
  };

  const handleDecisionComplete = (decision) => {
    onDecision(decision);

    // reset modal state
    setShowConsequenceModal(false);
    setSelectedPriority(null);
  };

  return (
    <div className="board-screen fade-in">
      <div className="board-overlay">

        <ProgressTracker current={hurdleIndex} />

        <div className="hurdle-box">
          <h2>{hurdle.title}</h2>
          <p>{hurdle.text}</p>
          <p className="warning-text"> To get something in this game, you must give something.</p>
        </div>
      </div>

      <div className="player-section">
        <img
          className="player-piece"
          src={character}
          alt="player"
        />
      </div>

      <PriorityHand
        priorities={priorities}
        onSelect={handlePrioritySelect}
      />

      {showConsequenceModal && selectedPriority && (
        <ConsequenceModal
          priority={selectedPriority}
          onClose={handleCloseModal}
          onSubmit={handleDecisionComplete}
        />
      )}
    </div>
  );
}

export default GameBoard;