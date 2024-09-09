import CanvasFigure from "./CanvasFigure";

export default function CanvasLogo() {
  return (
    <div className="flex flex-row items-center">
      <h1 className="font-bold text-amber-400 lg:text-[8rem] md:text-[4rem] font-serif">
        HOW HIGH
      </h1>
      <CanvasFigure />
    </div>
  );
}
