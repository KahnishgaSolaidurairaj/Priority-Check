import "../styles/receipt.css";

function ReceiptScreen({
  receipt,
  endingAnswers,
  bailed,
  onReplay,
}) {
  const generateReceiptText = () => {
    let text = "~~~ Priority Check Results ~~~\n\n";

    receipt.forEach((item, index) => {
      text += `Hurdle ${index + 1}: ${item.hurdle.title}\n`;
      text += `Priority Given Up: ${item.priority}\n`;
      const consequenceCard = item.consequence
        .split("/")
        .pop()
        .replace(".png", "");
      text += `Consequence Card: ${consequenceCard}\n`;

      // text += `Consequence Card: ${item.consequence}\n`;
      text += `Decision: ${
        item.accepted
          ? "Accepted Consequence"
          : "Emergency Exit"
      }\n`;
      text += `Commentary: ${item.commentary}\n\n`;
    });

    text += "~~~ Final Reflection ~~~\n\n";

    text += `Emergency Exit Response:\n`;
    text += `${endingAnswers.reflection || ""}\n\n`;

    text += `Experience with Mental Health Support at UIC:\n`;
    text += `${endingAnswers.support || ""}\n\n`;

    text += `Game Outcome: ${
      bailed
        ? "Player used the Emergency Exit."
        : "Player reached the Counseling Center."
    }\n`;

    return text;
  };

  const handleShare = async () => {
    const text = generateReceiptText();

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Priority Check Results",
          text,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        alert("Results copied to your clipboard!");
      } else {
        alert("Sharing is not supported in this browser.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleDownload = () => {
    try {
      const text = generateReceiptText();

      const blob = new Blob([text], {
        type: "text/plain;charset=utf-8",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "priority-check-response.txt";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="receipt-screen fade-in">
      <div className="receipt-card">
        <h1>Game Receipt</h1>

        {receipt.map((item, index) => (
          <div key={index} className="receipt-entry">
            <h3>{item.hurdle.title}</h3>

            <div className="receipt-images">
              <img
                src={`${import.meta.env.BASE_URL}priorityCards/${item.priority}.png`}
                alt="priority"
              />

              <img
                src={item.consequence}
                alt="consequence"
              />
            </div>

            <p>
              <strong>Decision:</strong>{" "}
              {item.accepted
                ? "Accepted Consequence"
                : "Bailed Out"}
            </p>

            <p>
              <strong>Commentary:</strong>{" "}
              {item.commentary}
            </p>
          </div>
        ))}

        <div className="final-section">
          <h2>Final Reflection</h2>
          <h3>Emergency Exit Response</h3>
          <p>{endingAnswers.reflection}</p>
          <h3> Do you have experience with MentalHealth support at UIC? </h3>
          <p>{endingAnswers.support}</p>
        </div>

        <div className="receipt-buttons">
          <button onClick={onReplay}> Play Again </button>
          <button onClick={handleShare}> Share Results </button>
          <button onClick={handleDownload}> Download Response </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptScreen;