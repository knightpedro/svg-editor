import { select } from "d3";
import { SVGPointFromClientPoint } from "../utils";
import { Circle, Rect } from "../graphics";
import { Canvas, Point } from "../interfaces";
import { Graphic } from "../../dist/graphics";

const XMLNS = "http://www.w3.org/2000/svg";

export class SVGCanvas implements Canvas {
  private svg: SVGSVGElement;

  constructor(container: HTMLDivElement) {
    this.svg = document.createElementNS(XMLNS, "svg");
    container.appendChild(this.svg);
  }

  draw(graphic: Graphic) {
    if (graphic instanceof Circle) this.drawCircle(graphic as Circle);
    else if (graphic instanceof Rect) this.drawRect(graphic as Rect);
  }

  drawCircle(circle: Circle) {
    select(this.svg)
      .append("circle")
      .attr("data-id", circle.id)
      .attr("cx", circle.x)
      .attr("cy", circle.y)
      .attr("r", circle.r);
  }

  drawRect(rect: Rect) {
    select(this.svg)
      .append("rect")
      .attr("data-id", rect.id)
      .attr("x", rect.x)
      .attr("y", rect.y)
      .attr("width", rect.width)
      .attr("height", rect.height);
  }

  localPoint(point: Point): Point {
    return SVGPointFromClientPoint(point, this.svg);
  }

  updateGraphic(graphic: Graphic) {
    if (graphic instanceof Circle) this.updateCircle(graphic as Circle);
    else if (graphic instanceof Rect) this.updateRect(graphic as Rect);
  }

  updateCircle(circle: Circle): void {
    this.selectById(circle.id)
      .attr("cx", circle.x)
      .attr("cy", circle.y)
      .attr("r", circle.r);
  }

  updateRect(rect: Rect): void {
    this.selectById(rect.id)
      .attr("x", rect.x)
      .attr("y", rect.y)
      .attr("width", rect.width)
      .attr("height", rect.height);
  }

  removeGraphic(id: string): void {
    select(`[data-id="${id}"]`).remove();
  }

  register(
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
  ): void {
    this.svg.addEventListener(type, listener, options);
  }

  selectById(id: string) {
    return select(`[data-id="${id}"]`);
  }

  unregister(
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions
  ): void {
    this.svg.removeEventListener(type, listener, options);
  }
}
