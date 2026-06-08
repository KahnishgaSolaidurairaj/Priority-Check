import { useState } from 'react';
import '../styles/ending.css';

function EndingQuestions({ bailed, onSubmit }) {
  const [answers, setAnswers] = useState({
    reflection: '',
    support: '',
  });
  
  return (
    <div className="ending-screen fade-in">
      <div className="ending-card">
        <h1>
          {bailed
            ? 'You Chose The Emergency Exit'
            : 'You Reached Mental Health Treatment'}
        </h1>
        
        <textarea
          placeholder={
            bailed
              ? 'Why did you decide to hit the emergency exit button?'
              : 'Where were you considering pressing the emergency exit button?'
          }
          onChange={(e) =>
            setAnswers({ ...answers, reflection: e.target.value })
          }
        />

        <textarea
          placeholder="Do you have experience with Mental Health support at UIC?"
          onChange={(e) =>
            setAnswers({ ...answers, support: e.target.value })
          }
        />

        <button onClick={() => onSubmit(answers)}>
          Generate Receipt
        </button>
      </div>
    </div>
  );
}

export default EndingQuestions;