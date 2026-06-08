import { useState } from "react";
import { getConsequenceOptions } from "../utils/helpers";
import QuestionModal from "./QuestionModal";

import "../styles/modal.css";

function ConsequenceModal({
  priority,
  onSubmit,
  onClose,
}) {
  const consequences = getConsequenceOptions(priority);

  const [selectedConsequence, setSelectedConsequence] =
    useState(null);

  const [showQuestion, setShowQuestion] =
    useState(false);

  const handleContinue = () => {
    if (!selectedConsequence) return;

    setShowQuestion(true);
  };

  return (
    <>
      {!showQuestion && (
        <div className="modal-overlay">
          <div className="modal-card fade-in">

            <h2>Choose Your Consequence</h2>
            <p> Every priority has three possible consequences.</p>

            <div className="consequence-grid">
              {consequences.map((card) => (
              <div
                key={card}
                className={`flip-card ${
                selectedConsequence === card ? "selected" : ""
              }`}
              onClick={() => {
                if (!selectedConsequence) {
                    setSelectedConsequence(card);
                }
              }}
              >
              {selectedConsequence === card ? (
              <img src={card} alt="consequence" />
              ) : (
              <div className="card-back"> ? </div>
              )}
              </div>
            ))}

            </div>

            <div className="modal-buttons">
                <button
                disabled={!selectedConsequence}
                onClick={handleContinue}
                > Continue </button>

                {!selectedConsequence && (
                <button
                className="secondary-button"
                onClick={onClose}
                > Cancel </button> 
                )}
            </div>

          </div>
        </div>
      )}

      {showQuestion && (
        <QuestionModal
          priority={priority}
          consequence={selectedConsequence}
          onSubmit={(decision) => {
            onSubmit(decision);
          }}
        />
      )}
    </>
  );
}

export default ConsequenceModal;