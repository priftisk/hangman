import PropTypes from "prop-types";
export default function GameOverScreen({
  gameOver,
  gameOverText,
  handleRestart,
}) {
  if (gameOver) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center flex-col gap-2">
        <span className="text-[6rem] text-red-700 font-serif">GAME OVER</span>
        <span  className="font-bold text-xl text-white">{gameOverText}</span>
        <button className="px-3 py-3 text-2xl text-white font-serif font-bold bg-slate-600 rounded-lg" onClick={handleRestart}>RESTART</button>
      </div>
    );
  }
}

GameOverScreen.propTypes = {
  gameOver: PropTypes.bool,
  gameOverText: PropTypes.string,
  handleRestart: PropTypes.func
};
