import MineFieldFigure from "./MineFieldFigure";

export default function MineFieldLogo() {
  return (
    <div className="flex flex-row items-center gap-4">
      <h1 className="font-bold text-green-400 lg:text-[8rem] md:text-[4rem] font-serif">
        MINEFIELD
      </h1>
      <MineFieldFigure />
    </div>
  );
}
