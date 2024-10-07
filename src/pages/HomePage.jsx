import { Link, Outlet, useLocation } from "react-router-dom";
import HangmanLogo from "../components/hangman/HangmanLogo";
import MineFieldLogo from "../components/battlefield/MineFieldLogo";
import SnakeLogo from "../components/snake/SnakeLogo";
import Back from "../icons/back";
import FlappyBirdLogo from "../components/flappybird/FlappyBirdLogo";

export default function HomePage() {
  const location = useLocation();
  const locationisHome = location.pathname === "/";

  return (
    <div className="flex flex-col items-center justify-center">
      {locationisHome && (
        <>
          <div className="animate-slideinright hover:scale-110 duration-500">
            <Link to={"hangman"}>
              <HangmanLogo />
            </Link>
          </div>
          <hr className="w-full" />
          <div className="animate-slideinleft hover:scale-110 duration-500">
            <Link to={"minefield"}>
              <MineFieldLogo />
            </Link>
          </div>
          <hr className="w-full" />
          <div className="animate-slideinright hover:scale-110 duration-500">
            <Link to={"snake"}>
              <SnakeLogo />
            </Link>
          </div>
          <hr className="w-full" />
          <div className="animate-slideinleft hover:scale-110 duration-500">
            <Link to={"flappy-bird"}>
              <FlappyBirdLogo />
            </Link>
          </div>
        </>
      )}
      <div className={`absolute top-2 left-2 ${locationisHome && "hidden"}`}>
        <Link to={"/"}>
          <Back />
        </Link>
      </div>
      <div className={`${!locationisHome && "animate-fadeinup"}`}>
        <Outlet />
      </div>
    </div>
  );
}
