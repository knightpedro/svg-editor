import { Point } from "../interfaces";
import { Graphic } from "./Graphic";

export class Line extends Graphic {
  start: Point = { x: 0, y: 0 };
  end: Point = { x: 0, y: 0 };
}
