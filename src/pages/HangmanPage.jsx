import { useEffect, useState } from "react";
import Letter from "../components/Letter";
import LetterKeyboard from "../components/LetterKeyboard";
import { getRandomWord, MAX_ATTEMPTS } from "../helper/utils";
import GameOver from "../components/GameOverScreen";
import GuessesMade from "../components/GuessesMade";
import GuessesRemaining from "../components/GuessesRemaning";
export default function HangmanPage() {
  const [wordToGuess, setWordToGuess] = useState("");
  const [wordState, setWordState] = useState([]);
  const [userGuess, setUserGuess] = useState("");
  const [lettersGuessed, setLettersGuessed] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [restartGame, setRestartGame] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(MAX_ATTEMPTS);
  const [playerWon, setPlayerWon] = useState(null);
  useEffect(() => {
    if (wordToGuess.length > 0) {
      const initialWordState = wordToGuess.split("").map((letter) => ({
        letter,
        found: false,
      }));
      setWordState(initialWordState);
    } else {
      setWordToGuess(getRandomWord());
    }
  }, [wordToGuess]);

  useEffect(() => {
    if (lettersGuessed.length > 0) {
      checkForGuess(lettersGuessed.slice(-1)[0], wordState);
    }
  }, [lettersGuessed]);

  function checkForGuess(letterGuesed, wordState) {
    if (gameOver === true) return;
    let isFoundUpdated = false;

    let newWordState = wordState.map((item) => {
      const isFound =
        !item.found && item.letter.toLowerCase() === letterGuesed.toLowerCase();

      if (isFound) {
        isFoundUpdated = true;
      }

      return {
        ...item,
        found: item.found || isFound,
      };
    });

    // Only decrease attempts if no items were updated (i.e., no letter was guessed correctly)
    if (!isFoundUpdated) {
      setAttemptsRemaining((prev) => prev - 1);
    }
    setWordState(newWordState);
    setUserGuess("");
  }
  function checkIfWon() {
    const totalLetters = wordState.length;
    const lettersFound = wordState.reduce(
      (acc, item) => (item.found ? (acc += 1) : (acc += 0)),
      0
    );
    if (totalLetters === lettersFound) {
      setGameOver(true);
      setPlayerWon(true);
    }
  }
  function checkIfLost() {
    if (attemptsRemaining === 0) {
      setGameOver(true);
      setPlayerWon(false);
    }
  }

  useEffect(() => {
    if (wordState.length > 0) {
      checkIfLost();
      checkIfWon();
    }
  }, [wordState]);

  useEffect(() => {
    if (restartGame === true) {
      setWordToGuess(getRandomWord());
      setUserGuess("");
      setLettersGuessed([]);
      setGameOver(false);
      setRestartGame(false);
      setAttemptsRemaining(MAX_ATTEMPTS);
      setPlayerWon(null);
    }
  }, [restartGame]);
  return (
    <div
      id="container"
      className="flex items-center flex-col lg:min-h-[40rem] md:min-h-[20rem] font-serif"
    >
      <GameOver
        visible={gameOver === true}
        setRestartGame={setRestartGame}
        playerWon={playerWon}
        result={wordToGuess}
      />
      <h1 className="font-bold text-red-400 lg:text-[8rem] md:text-[4rem]">
        HANGMAN
      </h1>
      <div className="flex flex-row items-center justify-center gap-2">
        {wordState.map((item, idx) => {
          return <Letter key={idx} data={item} idx={idx} />;
        })}
      </div>
      <div>
        <LetterKeyboard
          setUserGuess={setUserGuess}
          lettersGuessed={lettersGuessed}
          setLettersGuessed={setLettersGuessed}
        />
      </div>
      <GuessesRemaining attemptsRemaining={attemptsRemaining} />
      <GuessesMade lettersGuessed={lettersGuessed} wordToGuess={wordToGuess} />
    </div>
  );
}
