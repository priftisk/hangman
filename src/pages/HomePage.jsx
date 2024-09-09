import { Link, Outlet, useLocation } from "react-router-dom";
import HangmanLogo from "../components/hangman/HangmanLogo";
import CanvasLogo from "../components/canvas/CanvasLogo";

export default function HomePage() {
  const location = useLocation();
  const locationisHome = location.pathname === "/";
  // const locationIsHangman = location.pathname === "/hangman";
  // const locationIsCanvas = location.pathname === "/canvas";

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
          <Link to={"canvas"}>
            <CanvasLogo />
          </Link>
        </div>
      )}
      <div className={`${!locationisHome && "animate-fadeinup"}`}>
        <Outlet />
      </div>
    </>
  );
}
