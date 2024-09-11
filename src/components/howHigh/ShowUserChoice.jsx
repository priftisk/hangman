export default function ShowUserChoice({
  hasMadeChoice,
  progressState,
  progressStoppedAt,
  gameOver,
}) {
  return (
    <div className="flex flex-row gap-12 p-2 bg-gray-700 shadow-lg h-20">
      <div className="flex flex-col items-center justify-start">
        <span className="text-gray-300 text-lg font-semibold">YOU</span>
        <span className="text-green-500 text-3xl font-bold">
          {hasMadeChoice ? (progressStoppedAt.current * 100).toFixed(0) : null}
        </span>
      </div>

      <div className="flex flex-col items-center justify-start">
        <span className="text-gray-300 text-lg font-semibold">MAX</span>
        <span className="text-green-500 text-3xl font-bold">
          {gameOver ? (progressState.current * 100).toFixed(0) : null}
        </span>
      </div>
    </div>
  );
}
