import { Point } from "../interfaces/Point";
import { Graphic } from "./Graphic";

export class Rect extends Graphic {
  origin: Point = { x: 0, y: 0 };
  width = 0;
  height = 0;
}
