import { useEffect, useState } from "react";
import Letter from "../components/hangman/Letter";
import LetterKeyboard from "../components/hangman/LetterKeyboard";
import { getRandomWord, MAX_ATTEMPTS } from "../helper/utils";
import GameOver from "../components/hangman/GameOverScreen";
import GuessesMade from "../components/hangman/GuessesMade";
import GuessesRemaining from "../components/hangman/GuessesRemaning";
import HangmanLogo from "../components/hangman/HangmanLogo";
export default function HangmanPage() {
  const [wordToGuess, setWordToGuess] = useState("");
  const [wordState, setWordState] = useState([]);
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
    // setUserGuess("");
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
      // setUserGuess("");
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
      className="flex items-center justify-start flex-col lg:min-h-[40rem] md:min-h-[20rem] font-serif"
    >
      <GameOver
        visible={gameOver === true}
        setRestartGame={setRestartGame}
        playerWon={playerWon}
        result={wordToGuess}
      />
      <HangmanLogo attemptsRemaining={attemptsRemaining} />

      <div className="flex flex-row items-center justify-center gap-2">
        {wordState.map((item, idx) => {
          return <Letter key={idx} data={item} idx={idx} />;
        })}
      </div>

      <div>
        <LetterKeyboard
          setUserGuess={null}
          lettersGuessed={lettersGuessed}
          setLettersGuessed={setLettersGuessed}
        />
      </div>
      <GuessesRemaining attemptsRemaining={attemptsRemaining} />
      <GuessesMade lettersGuessed={lettersGuessed} wordToGuess={wordToGuess} />
    </div>
  );
}
