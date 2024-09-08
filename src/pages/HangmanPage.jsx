import { useEffect, useState } from "react";
import Letter from "../components/Letter";
import LetterInput from "../components/LetterInput";

export default function HangmanPage() {
  const wordToGuess = "hazardous";
  const [wordState, setWordState] = useState([]);
  const [userGuess, setUserGuess] = useState("");
  const [lettersGuessed, setLetterGuessed] = useState([]);
  useEffect(() => {
    const initialWordState = wordToGuess.split("").map((letter) => ({
      letter,
      found: false,
    }));
    setWordState(initialWordState);
  }, [wordToGuess]);
  const handleInput = (e) => {
    if (e.target.value.length === 0) setUserGuess(e.target.value);
    else {
      if (e.target.value.length === 1) {
        if (isNaN(parseInt(e.target.value))) {
          setUserGuess(e.target.value);
        } else {
          setUserGuess("");
        }
      }
    }
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      checkForGuess(userGuess, wordState);
    }
  };

  function checkForGuess(letterGuesed, wordState) {
    if (lettersGuessed.includes(letterGuesed)) {
      setUserGuess("");
      return;
    }
    let newWordState = wordState.map((item) => ({
      ...item,
      found: !item.found ? item.letter.toLowerCase() === letterGuesed.toLowerCase() : item.found,
    }));
    setWordState(newWordState);
    setLetterGuessed((prevLetterGuessed) => [...prevLetterGuessed, userGuess]);
    setUserGuess("");
  }

  return (
    <div id="container" className="flex items-center flex-col justify-center">
      <div className="flex flex-row items-center justify-center gap-2">
        {wordState.map((item, idx) => {
          return <Letter key={idx} data={item} idx={idx} />;
        })}
      </div>
      <div>
        <LetterInput
          value={userGuess}
          onChange={handleInput}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  );
}
