/* eslint-disable react/prop-types */
import { useMemo, useEffect, useState } from "react";
import { keyboardArray } from "../helper/utils";
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
        // Check if the key is already in prevLetters
        if (!prevLetters.includes(e.key)) {
          return [...prevLetters, e.key]; // Add the new key if it doesn't exist
        }
        return prevLetters; // Otherwise, return the previous array unchanged
      });

      setUserGuess(e.key);
      setSelectedKey(e.key);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      id="keyboard-container"
      className="flex items-start flex-col mt-20 h-[300px]"
    >
      <div id="keyboard-row-1" className="flex flex-row gap-0 items-center">
        {keyboardRow1.map((item) => {
          return (
            <KeyboardLetter
              key={item}
              letter={item}
              disabled={lettersGuessed.includes(item.toLowerCase())}
              selected={selectedKey.toLowerCase() === item.toLowerCase()}
            />
          );
        })}
      </div>
      <div id="keyboard-row-2" className="flex flex-row gap-0 items-center">
        {keyboardRow2.map((item) => {
          return (
            <KeyboardLetter
              key={item}
              letter={item}
              disabled={lettersGuessed.includes(item.toLowerCase())}
              selected={selectedKey.toLowerCase() === item.toLowerCase()}
            />
          );
        })}
      </div>
      <div id="keyboard-row-3" className="flex flex-row gap-0 items-center">
        {keyboardRow3.map((item) => {
          return (
            <KeyboardLetter
              key={item}
              letter={item}
              disabled={lettersGuessed.includes(item.toLowerCase())}
              selected={selectedKey.toLowerCase() === item}
            />
          );
        })}
      </div>
    </div>
  );
}
