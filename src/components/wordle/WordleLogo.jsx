import WordleFigure from "./WordleFigure";

export default function WordleLogo() {
  return (
    <div className="flex flex-row items-center gap-4">
      <h1 className="font-bold text-purple-700 lg:text-[8rem] md:text-[4rem] font-serif">
        WORDLE
      </h1>
      <WordleFigure />
    </div>
  );
}
