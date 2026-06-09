import "../styles/instructionScreen.css";

function InstructionScreen({ onContinue }) {
  return (
    <div className="instruction-screen fade-in">
      <div className="instruction-card">
        <h1>How to Play</h1>

        <div className="instruction-section">
          <h2>Game Instructions</h2>
          <p> Along the board, you will encounter various hurdles on your way toward the <strong>Counseling Center (CC)</strong>.</p>
          <p> At each hurdle, you must choose a <strong>priority</strong> to compromise. After making your choice, you will face a consequence related to that priority. </p>
          <p> If you decide that you do not want to accept that consequence, you may choose the <strong>Emergency Exit</strong>, ending the game and your opportunity to receive mental health support. </p>
        </div>

        <div className="instruction-section">
          <h2>Research Objective</h2>
          <p> We want to understand what people are willing or not willing to compromise in the pursuit of mental health support. </p>
        </div>

        <button
          className="instruction-button"
          onClick={onContinue}
        > Continue </button>
      </div>
    </div>
  );
}

export default InstructionScreen;