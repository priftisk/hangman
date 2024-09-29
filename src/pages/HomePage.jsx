import { Link, Outlet, useLocation } from "react-router-dom";
import HangmanLogo from "../components/hangman/HangmanLogo";
import MineFieldLogo from "../components/battlefield/MineFieldLogo";
// import HowHighLogo from "../components/howHigh/HowHighLogo";
// import WordleLogo from "../components/wordle/WordleLogo";

export default function HomePage() {
  const location = useLocation();
  const locationisHome = location.pathname === "/";
  // const locationIsHangman = location.pathname === "/hangman";
  // const locationIsCanvas = location.pathname === "/how-high";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-x-auto">
      {locationisHome && (
        <>
          <div className="animate-slideinleft hover:scale-110 duration-500">
            <Link to={"hangman"}>
              <HangmanLogo />
            </Link>
          </div>
          <hr className="w-full"/>
          <div className="animate-slideinright hover:scale-110 duration-500">
            <Link to={"minefield"}>
              <MineFieldLogo />
            </Link>
          </div>

          {/* <div className="animate-zoomin">
            <Link to={"how-high"}>
              <HowHighLogo />
            </Link>
          </div>
          <div className="animate-slideinright">
            <Link to={"wordle"}>
              <WordleLogo />
            </Link>
          </div> */}
        </>
      )}

      <div className={`${!locationisHome && "animate-fadeinup"}`}>
        <Outlet />
      </div>
    </div>
  );
}
