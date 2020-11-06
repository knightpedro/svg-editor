import { Graphic } from "../graphics/Graphic";
import { Rect } from "../graphics/Rect";
import { Point } from "./Point";

export interface Canvas {
  drawRect(rect: Rect): void;
  localPoint(point: Point): Point;
  updateGraphic(graphic: Graphic): void;
  removeGraphic(id: string): void;
  register(eventType: string, eventListener: EventListener): void;
  unregister(eventType: string, eventListener: EventListener): void;
}
