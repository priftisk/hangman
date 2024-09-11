import PauseIcon from "../../icons/pause";
import PlayIcon from "../../icons/play";
import RestartIcon from "../../icons/restart";
export default function HowHighButtons({
  gameStarted,
  hasMadeChoice,
  gameOver,
  handleEndClick,
  handleRestartClick,
  handleStartClick,
}) {
  const style =
    "w-24 h-20 bg-gray-700 flex-row items-center flex justify-center";
  if (!gameStarted && !gameOver) {
    return (
      <button className={style} onClick={() => handleStartClick()}>
        <PlayIcon />
      </button>
    );
  }
  if (gameStarted && !gameOver && !hasMadeChoice) {
    return (
      <button className={style} onClick={() => handleEndClick()}>
        <PauseIcon />
      </button>
    );
  }
  if (gameOver && !gameStarted) {
    return (
      <button className={style} onClick={() => handleRestartClick()}>
        <RestartIcon />
      </button>
    );
  }
}
