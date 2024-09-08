import { useState, useEffect } from "react";
import PropTypes from "prop-types";
export default function GameOver({
  visible,
  setRestartGame,
  playerWon,
  result,
}) {
  const [showContent, setShowContent] = useState(false);

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.keyCode === 32) {
      setRestartGame(true);
    }
  }

  useEffect(() => {
    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 750);

      return () => clearTimeout(timer); 
    } else {
      setShowContent(false); // Hide content when visible is false
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [visible]);

  if (showContent) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center flex-col z-50">
        <h1 className="text-white text-[6rem] font-serif font-bold">
          GAME OVER
        </h1>
        <h1
          className={`${
            playerWon === true ? "text-green-400" : "text-red-400"
          } text-[4rem] font-bold`}
        >
          {playerWon !== null && (playerWon === true ? "You won" : "You lost")}
        </h1>
        <div className="flex flex-row items-center gap-2">
          <span className="text-white text-xl">Word was</span>
          <h2 className="text-white text-2xl underline p-2 font-serif uppercase">
            {result}
          </h2>
        </div>

        <button
          onClick={() => setRestartGame(true)}
          className="bg-slate-700 p-0 rounded-md text-xl w-32 mt-12 h-14 font-serif text-white font-bold hover:bg-slate-500 animate-bounce"
        >
          RESTART
        </button>
      </div>
    );
  }

  return null;
}

GameOver.propTypes = {
  visible: PropTypes.bool,
  setRestartGame: PropTypes.func,
  playerWon: PropTypes.bool,
  result: PropTypes.string,
};
