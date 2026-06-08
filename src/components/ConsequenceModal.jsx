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

  const [selectedConsequence, setSelectedConsequence] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);

  return (
    <>
      {!showQuestion && (
        <div className="modal-overlay">
          <div className="modal-card fade-in">

            <h2>Choose Your Consequence</h2>

            <div className="consequence-grid">

              {consequences.map((card, index) => (
                <div
                  key={index}
                  className={`flip-card ${
                    selectedConsequence === card
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedConsequence(card)
                  }
                >
                  {selectedConsequence === card ? (
                    <img
                      src={card}
                      alt="consequence"
                    />
                  ) : (
                    <div className="card-back">
                      ?
                    </div>
                  )}
                </div>
              ))}

            </div>

            {selectedConsequence && (
              <button
                onClick={() =>
                  setShowQuestion(true)
                }
              >
                Continue
              </button>
            )}

          </div>
        </div>
      )}

      {showQuestion && (
        <QuestionModal
          priority={priority}
          consequence={selectedConsequence}
          onSubmit={(decision) => {
            onSubmit(decision);
            onClose();
          }}
        />
      )}
    </>
  );
}

export default ConsequenceModal;