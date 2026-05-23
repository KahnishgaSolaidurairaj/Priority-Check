import { useState } from 'react';
import { getRandomConsequence } from '../utils/helpers';
import QuestionModal from './QuestionModal';

import '../styles/modal.css';

function ConsequenceModal({ priority, onSubmit }) {
    const [flipped, setFlipped] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const consequence = getRandomConsequence(priority);

    return (
        <div className="modal-overlay">
            <div className="modal-card fade-in">
                <h2>Choose Your Consequence</h2>
            <div
                className={`flip-card ${flipped ? 'flipped' : ''}`}
                onClick={() => setFlipped(true)}
            >
                {!flipped ? (
                    <div className="card-back">?</div>
                ) : (
                    <img src={consequence} alt="consequence" />
                )}
            </div>
            
            {flipped && (
                <button onClick={() => setShowQuestion(true)}>
                    Continue
                </button>
            )}
        </div>

        {showQuestion && (
            <QuestionModal
                priority={priority}
                consequence={consequence}
                onSubmit={onSubmit}
            />
        )}
    </div>
    );
}

export default ConsequenceModal;