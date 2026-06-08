import { useState } from "react";

function QuestionModal({
  priority,
  consequence,
  onSubmit,
}) {
  const [accepted, setAccepted] = useState(null);
  const [commentary, setCommentary] = useState("");

  const handleFinish = () => {
    if (accepted === null) return;

    onSubmit({
      priority,
      consequence,
      accepted,
      commentary,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card fade-in">

        <h2>
          Is this acceptable in pursuit of
          mental health?
        </h2>

        <div className="decision-buttons">

          <button
            className={
              accepted === true
                ? "choice-button active"
                : "choice-button"
            }
            onClick={() => setAccepted(true)}
          >
            Yes
          </button>

          <button
            className={
              accepted === false
                ? "choice-button active"
                : "choice-button"
            }
            onClick={() => setAccepted(false)}
          >
            No
          </button>

        </div>

        <textarea
          placeholder="Share your thoughts..."
          value={commentary}
          onChange={(e) =>
            setCommentary(e.target.value)
          }
        />

        {accepted !== null && (
          <>
            {accepted ? (
              <button
                className="next-button"
                onClick={handleFinish}
              >
                Next
              </button>
            ) : (
              <button
                className="bail-button"
                onClick={handleFinish}
              >
                EMERGENCY EXIT
              </button>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default QuestionModal;