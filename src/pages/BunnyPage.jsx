import { Stage } from "@pixi/react";
import Bunny from "../components/bunny/Bunny";
import { WIDTH, HEIGHT } from "../helper/bunny";
import Carrot from "../components/bunny/Carrot";
import { useState } from "react";

export default function BunnyPage() {
  const [carrotPos, setCarrotPos] = useState({ x: 200, y: 300});
  const [score, setScore] = useState(0)
  console.log(carrotPos)
  return (
    <Stage width={WIDTH} height={HEIGHT} options={{ background: 0x1099bb }}>
      <Bunny setCarrotPos={setCarrotPos} setScore={setScore} carrotPos={carrotPos}/>
      <Carrot pos={carrotPos}/>
    </Stage>
  );
}
