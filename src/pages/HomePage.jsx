import { Link, Outlet, useLocation } from "react-router-dom";
import HangmanLogo from "../components/hangman/HangmanLogo";
import HowHighLogo from "../components/howHigh/HowHighLogo";

export default function HomePage() {
  const location = useLocation();
  const locationisHome = location.pathname === "/";
  // const locationIsHangman = location.pathname === "/hangman";
  // const locationIsCanvas = location.pathname === "/how-high";

  return (
    <>
      {locationisHome && (
        <div className="animate-zoomin">
          <Link to={"hangman"}>
            <HangmanLogo attemptsRemaining={0} />
          </Link>
        </div>
      )}
      {locationisHome && (
        <div className="animate-zoomin">
          <Link to={"how-high"}>
            <HowHighLogo />
          </Link>
        </div>
      )}
      <div className={`${!locationisHome && "animate-fadeinup"}`}>
        <Outlet />
      </div>
    </>
  );
}
