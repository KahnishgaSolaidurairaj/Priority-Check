import { getRandomCharacterSet } from '../utils/helpers';
import '../styles/charSelect.css';

function CharacterSelect({ onSelect }) {
  // const options = Array.from({ length: 4 }, () => getRandomCharacter());
  const options = getRandomCharacterSet();
  return (
    <div className="character-screen fade-in">
        <h1>Choose Your Character</h1>
        <div className="character-grid">
            {options.map((piece, index) => (
            <div
                key={index}
                className="character-card"
                onClick={() => onSelect(piece)}
            >
                <img src={piece} alt="player piece" />
            </div>
        ))}
        </div>
    </div>
  );
}

export default CharacterSelect;