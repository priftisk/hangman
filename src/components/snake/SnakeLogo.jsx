import SnakeFigure from "./SnakeFigure";

export default function SnakeLogo() {
  return (
    <div className="flex flex-row items-center gap-10">
      <h1 className="font-bold text-amber-400 lg:text-[8rem] md:text-[4rem] font-serif">
        SNAKE
      </h1>
      <SnakeFigure />
    </div>
  );
}
