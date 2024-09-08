export default function GuessesRemaining({ attemptsRemaining }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="text-2xl text-white">
        Guesses Remaining: 
      </div>
      <div className="text-[2.5rem] text-white">
      {attemptsRemaining}
      </div>
    </div>
  );
}
