import '../styles/cards.css';
function PriorityHand({ priorities, onSelect }) {
    return (
        <div className="priority-hand">
            {priorities.map((card) => (
            <img
                key={card}
                src={`./priorityCards/${card}.png`}
                alt={card}
                className="priority-card"
                onClick={() => onSelect(card)}
            />
            ))}
        </div>
    );
}

export default PriorityHand;