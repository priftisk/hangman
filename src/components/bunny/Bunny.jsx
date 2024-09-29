import { Sprite, useTick } from "@pixi/react";
import { useEffect, useState, useRef } from "react";
import { WIDTH, HEIGHT, VELOCITY } from "../../helper/bunny";
import bunny from "../../icons/bunny/bunny.png";
export default function Bunny({ setCarrotPos, setScore, carrotPos }) {
  const [position, setPosition] = useState({ x: WIDTH / 2, y: HEIGHT / 2 });
  // Use a ref to store the current keys pressed
  const keysPressed = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  // Handle key down and key up events
  const handleKeyDown = (e) => {
    if (["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
      keysPressed.current[e.key] = true;
    }
  };

  const handleKeyUp = (e) => {
    if (["w", "a", "s", "d"].includes(e.key.toLowerCase())) {
      keysPressed.current[e.key] = false;
    }
  };

  // Add event listeners for key down and key up
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const margin = 5;
    const targetX = carrotPos.x;
    const targetY = carrotPos.y;
    
    if (
      Math.abs(parseInt(position.x) - targetX) <= margin &&
      Math.abs(parseInt(position.y) - targetY) <= margin
    ) {
      setCarrotPos({ x: parseInt(Math.random() * WIDTH), y: parseInt(Math.random() * HEIGHT) });
      setScore((prev) => prev + 1);
    }
  }, [position]);

  // Update the bunny's position on each tick
  useTick((delta) => {
    setPosition((prevPosition) => {
      let newX = prevPosition.x;
      let newY = prevPosition.y;

      if (keysPressed.current.w) newY -= VELOCITY * delta; // Move up
      if (keysPressed.current.a) newX -= VELOCITY * delta; // Move left
      if (keysPressed.current.s) newY += VELOCITY * delta; // Move down
      if (keysPressed.current.d) newX += VELOCITY * delta; // Move right

      // Ensure the bunny stays within the screen boundaries
      newX = Math.max(0, Math.min(WIDTH - 30, newX));
      newY = Math.max(0, Math.min(HEIGHT - 10, newY));

      return { x: newX, y: newY };
    });
  });

  return <Sprite image={bunny} x={position.x} y={position.y} zIndex={2} />;
}
