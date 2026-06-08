export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getRandomCharacterSet = () => {
  const sets = [1, 2];
  const letters = ["A", "B", "C", "D"];

  const randomSet =
    sets[Math.floor(Math.random() * sets.length)];

  const characters = letters.map(
    (letter) => `/players/${randomSet}${letter}.png`
  );

  return shuffleArray(characters);
};

export const getRandomConsequence = (priority) => {
  const randomNum =
    Math.floor(Math.random() * 3) + 1;

  return `/consequenceCards/${priority}${randomNum}.png`;
};

export const getConsequenceOptions = (priority) => {
  return [
    `/consequenceCards/${priority}1.png`,
    `/consequenceCards/${priority}2.png`,
    `/consequenceCards/${priority}3.png`,
  ];
};