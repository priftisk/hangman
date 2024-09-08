import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex items-center">
      <Link to={"/hangman"}>
        <button className="w-60 h-30 bg-slate-700 p-4 rounded-lg text-white font-bold text-2xl">
          HANGMAN
        </button>
      </Link>
    </div>
  );
}
