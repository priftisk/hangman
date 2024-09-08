import PropTypes from "prop-types";
import { useMemo, useEffect, useState } from "react";
import { keyboardArray } from "../../helper/utils";
import KeyboardLetter from "./KeyboardLetter";
export default function LetterKeyboard({
  setUserGuess,
  lettersGuessed,
  setLettersGuessed,
}) {
  const keyboardRow1 = useMemo(() => keyboardArray.slice(0, 10), []);
  const keyboardRow2 = useMemo(() => keyboardArray.slice(10, 19), []);
  const keyboardRow3 = useMemo(() => keyboardArray.slice(19, 28), []);
  const [selectedKey, setSelectedKey] = useState("");

  const handleKeyDown = (e) => {
    if (/^[a-zA-Z]$/.test(e.key)) {
      setLettersGuessed((prevLetters) => {
        if (!prevLetters.includes(e.key)) {
          return [...prevLetters, e.key];
        }
        return prevLetters;
      });

      setUserGuess(e.key);
      setSelectedKey(e.key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      setSelectedKey("");
    };
  }, []);

  return (
    <div
      id="keyboard-container"
      className="flex items-start flex-col mt-20 h-[300px] "
    >
      <div
        id="keyboard-row-1"
        className="flex flex-row gap-0 items-center border-y-2 border-l-2"
      >
        {keyboardRow1.map((item) => {
          return (
            <KeyboardLetter
              key={item}
              letter={item}
              disabled={lettersGuessed.includes(item.toLowerCase())}
              // selected={selectedKey.toLowerCase() === item.toLowerCase()}
              selected={false}
            />
          );
        })}
      </div>
      <div
        id="keyboard-row-2"
        className="flex flex-row gap-0 items-center border-b-2 border-l-2"
      >
        {keyboardRow2.map((item) => {
          return (
            <KeyboardLetter
              key={item}
              letter={item}
              disabled={lettersGuessed.includes(item.toLowerCase())}
              // selected={selectedKey.toLowerCase() === item.toLowerCase()}
              selected={false}
            />
          );
        })}
      </div>
      <div
        id="keyboard-row-3"
        className="flex flex-row gap-0 items-center border-b-2 border-l-2"
      >
        {keyboardRow3.map((item) => {
          return (
            <KeyboardLetter
              key={item}
              letter={item}
              disabled={lettersGuessed.includes(item.toLowerCase())}
              // selected={selectedKey.toLowerCase() === item}
              selected={false}
            />
          );
        })}
      </div>
    </div>
  );
}

LetterKeyboard.propTypes = {
  setUserGuess: PropTypes.func,
  lettersGuessed: PropTypes.array,
  setLettersGuessed: PropTypes.func,
};
