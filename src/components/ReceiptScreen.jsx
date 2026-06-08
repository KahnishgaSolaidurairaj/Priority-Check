import '../styles/receipt.css';

function ReceiptScreen({
  receipt,
  endingAnswers,
  bailed,
  onReplay,
}) {
  return (
    <div className="receipt-screen fade-in">
      <div className="receipt-card">
        <h1>Game Receipt</h1>

        {receipt.map((item, index) => (
          <div key={index} className="receipt-entry">
            <h3>{item.hurdle.title}</h3>

            <div className="receipt-images">
              <img
                src={`./priorityCards/${item.priority}.png`}
                alt="priority"
              />
              <img src={item.consequence} alt="consequence" />
            </div>
            <p>
              Decision:{' '}
              {item.accepted ? 'Accepted Consequence' : 'Bailed Out'}
            </p>
            <p>Commentary: {item.commentary}</p>
          </div>
        ))}

        <div className="final-section">
          <h2>Final Reflection</h2>
          <p>{endingAnswers.reflection}</p>
          <h2>UIC Mental Health Support Response</h2>
          <p>{endingAnswers.support}</p>
        </div>

        <div className="receipt-buttons">
          <button onClick={onReplay}>Play Again</button>
          <button>Share Results</button>
          <button>Download Response</button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptScreen;