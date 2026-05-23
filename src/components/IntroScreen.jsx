import '../styles/intro.css';

function IntroScreen({ onStart }) {
  return (
    <div className="intro-screen fade-in">
      <div className="intro-card">
        <h1>Priority Check</h1>
        <h3>What matters most when life gets full?</h3>
        <p> Hello we are HAL students from the UIC Innovation Center.
            We want to know where students stop in the path of registration,
            getting information, scheduling, and reaching mental health services.
        </p>
        <p> What are you willing to compromise in the pursuit of mental health? </p>

        <button onClick={onStart}>Play Game</button>
      </div>
    </div>
  );
}

export default IntroScreen;