import { Link, Outlet, useLocation } from "react-router-dom";
import HangmanLogo from "../components/hangman/HangmanLogo";
// import HowHighLogo from "../components/howHigh/HowHighLogo";
// import WordleLogo from "../components/wordle/WordleLogo";

export default function HomePage() {
  const location = useLocation();
  const locationisHome = location.pathname === "/";
  // const locationIsHangman = location.pathname === "/hangman";
  // const locationIsCanvas = location.pathname === "/how-high";

  return (
    <>
      {locationisHome && (
        <>
          <div className="animate-slideinleft">
            <Link to={"hangman"}>
              <HangmanLogo />
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
    </>
  );
}
