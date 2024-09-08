import PropTypes from "prop-types";
export default function GuessesRemaining({ attemptsRemaining }) {
  return (
    <div className="flex flex-row items-center gap-2 ">
      <div className="text-2xl text-white underline">Guesses Remaining</div>
      <div className="text-[2.5rem] text-white ">{attemptsRemaining}</div>
    </div>
  );
}

GuessesRemaining.propTypes = {
  attemptsRemaining: PropTypes.number,
};
