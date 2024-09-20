import PropTypes from "prop-types";
import { useEffect } from "react";
export default function WordleInputs({ wordToGuess }) {

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                console.log("ENTER")
            }
        })
    },[])
  return (
    <div className="flex flex-row gap-2 items-center">
      {Array.from({ length: wordToGuess.length }, (letter, idx) => (
        <input
          key={idx}
          id={`input-${idx}`}
          className="w-20 h-20 bg-slate-500 px-8 text-2xl"
        />
      ))}
    </div>
  );
}

WordleInputs.propTypes = {
  wordToGuess: PropTypes.string,
};
