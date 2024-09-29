import PropTypes from "prop-types";
export default function YouWonScreen({ youWon, handleRestart, movesMade }) {
  if (youWon)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center flex-col gap-1">
        <span className="text-[6rem] text-green-400 font-serif flex flex-col">
          YOU WON
          <br />
          <span className="text-white text-[1.5rem]">
            in {movesMade - 1} moves
          </span>
        </span>

        <button
          className="px-3 py-3 text-2xl text-white font-serif font-bold bg-slate-600 rounded-lg"
          onClick={handleRestart}
        >
          RESTART
        </button>
      </div>
    );
}

YouWonScreen.propTypes = {
  youWon: PropTypes.bool,
  handleRestart: PropTypes.func,
  movesMade: PropTypes.number,
};
