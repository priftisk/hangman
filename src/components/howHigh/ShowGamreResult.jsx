export default function ShowGameResult({ gameResult }) {
  if (gameResult) {
    return (
      <span className="text-2xl text-amber-600 text-center font-serif uppercase underline">
        {gameResult}
      </span>
    );
  }
}
