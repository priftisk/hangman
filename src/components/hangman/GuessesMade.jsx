import PropTypes from "prop-types";
export default function GuessesMade({ lettersGuessed, wordToGuess }) {
  const lettersInWord =
    wordToGuess && wordToGuess.length > 0 && wordToGuess.split("");
  return (
    <div className={`flex flex-col items-center gap-2`}>
      <span className="text-2xl text-white underline">Guesses made</span>
      <div className="flex flex-row items-center gap-1">
        {lettersGuessed.map((letter, idx) => {
          const isCorrect = lettersInWord.includes(letter.toLowerCase());
          return (
            <span
              key={idx}
              className={` font-bold uppercase text-2xl ${
                isCorrect === true ? "text-green-400" : "text-red-500"
              }`}
            >
              {letter}<span className="text-white">,</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

GuessesMade.propTypes = {
  lettersGuessed: PropTypes.array,
  wordToGuess: PropTypes.string,
};
