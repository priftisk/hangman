import { Link, Outlet, useLocation } from "react-router-dom";
import HangmanLogo from "../components/hangman/HangmanLogo";

export default function HomePage() {
  const location = useLocation();
  const locationisHome = location.pathname === "/";
  const locationIsHangman = location.pathname === "/hangman";
  return (
    <>
      {locationIsHangman ||
        (locationisHome && (
          <div className="animate-zoomin">
            <Link to={"hangman"}>
              <HangmanLogo attemptsRemaining={0} />
            </Link>
          </div>
        ))}

      <Outlet />
    </>
  );
}
