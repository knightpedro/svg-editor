import { Graphic } from "../graphics";
import { Point } from "./Point";

export interface Canvas {
  draw(graphic: Graphic): void;
  localPoint(point: Point): Point;
  updateGraphic(graphic: Graphic): void;
  removeGraphic(id: string): void;

  register(
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
  ): void;

  unregister(
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
  ): void;
}
