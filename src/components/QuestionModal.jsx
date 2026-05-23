import { useState } from 'react';
function QuestionModal({ priority, consequence, onSubmit }) {
  const [accepted, setAccepted] = useState(true);
  const [commentary, setCommentary] = useState('');
  const handleFinish = () => {
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
        <h2>Is this acceptable in pursuit of mental health?</h2>

        <div className="decision-buttons">
          <button onClick={() => setAccepted(true)}>Yes</button>
          <button onClick={() => setAccepted(false)}>No</button>
        </div>
        
        <textarea
          placeholder="Share your thoughts..."
          value={commentary}
          onChange={(e) => setCommentary(e.target.value)}
        />

        {!accepted && (
          <button className="bail-button" onClick={handleFinish}>
            EMERGENCY EXIT
          </button>
        )}

        {accepted && (
          <button onClick={handleFinish}>Next</button>
        )}
      </div>
    </div>
  );
}

export default QuestionModal;