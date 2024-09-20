import HangmanFigure from "./HangmanFigure";

export default function HangmanLogo({ attemptsRemaining=0 }) {
  return (
    <div className="flex flex-row items-center">
      <h1 className="font-bold text-red-400 lg:text-[8rem] md:text-[4rem] font-serif">
        HANGMAN
      </h1>
      <HangmanFigure attemptsRemaining={attemptsRemaining} />
    </div>
  );
}
