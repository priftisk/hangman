import { Sprite } from "@pixi/react";
import carrot from "../../icons/bunny/carrot.png";

export default function Carrot({ pos }) {
  return <Sprite image={carrot} x={pos.x} y={pos.y} zIndex={1} />;
}
