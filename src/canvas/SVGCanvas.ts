import { select } from "d3";
import { SVGPointFromClientPoint } from "../utils";
import { Circle, Line, Rect } from "../graphics";
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
    else if (graphic instanceof Line) this.drawLine(graphic as Line);
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

  drawLine(line: Line) {
    select(this.svg)
      .append("line")
      .attr("data-id", line.id)
      .attr("x1", line.start.x)
      .attr("y1", line.start.y)
      .attr("x2", line.end.x)
      .attr("y2", line.end.y);
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
    else if (graphic instanceof Line) this.updateLine(graphic as Line);
    else if (graphic instanceof Rect) this.updateRect(graphic as Rect);
  }

  updateCircle(circle: Circle) {
    this.selectById(circle.id)
      .attr("cx", circle.x)
      .attr("cy", circle.y)
      .attr("r", circle.r);
  }

  updateLine(line: Line) {
    this.selectById(line.id)
      .attr("x1", line.start.x)
      .attr("y1", line.start.y)
      .attr("x2", line.end.x)
      .attr("y2", line.end.y);
  }

  updateRect(rect: Rect) {
    this.selectById(rect.id)
      .attr("x", rect.x)
      .attr("y", rect.y)
      .attr("width", rect.width)
      .attr("height", rect.height);
  }

  removeGraphic(id: string) {
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
