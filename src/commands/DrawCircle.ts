import { select } from "d3-selection";
import { DrawingTool } from "./DrawingTool";
import { Point } from "../interfaces/Point";
import { distanceBetweenPoints, SVGPointFromEvent } from "../utils/index";

export class DrawCircle extends DrawingTool {
  centre: Point = { x: 0, y: 0 };
  radius = 0;
  notifyComplete = () => {};
  firstClick = true;

  static createIcon() {
    const icon = document.createElement("button");
    icon.innerHTML = "Circle";
    return icon;
  }

  activate() {
    this.svg.addEventListener("click", this.handleClick);
  }

  cancel() {
    this.deactivate();
    this.selection().remove();
  }

  complete() {
    this.deactivate();
    this.selection().classed("preview", false);
    this.notifyComplete();
  }

  createPreview() {
    select(this.svg)
      .append("circle")
      .attr("data-id", this.id)
      .attr("cx", this.centre.x)
      .attr("cy", this.centre.y)
      .classed("preview", true);
  }

  deactivate() {
    this.svg.removeEventListener("click", this.handleClick);
    this.svg.removeEventListener("mousemove", this.handleMouseMove);
  }

  execute(notify: () => void) {
    this.notifyComplete = notify;
    this.activate();
  }

  handleClick = (e: MouseEvent) => {
    const point = SVGPointFromEvent(e, this.svg);
    if (this.firstClick) {
      this.centre = point;
      this.firstClick = false;
      this.createPreview();
      this.svg.addEventListener("mousemove", this.handleMouseMove);
    } else {
      this.update(point);
      this.complete();
    }
  };

  handleMouseMove = (e: MouseEvent) => {
    const point = SVGPointFromEvent(e, this.svg);
    this.update(point);
  };

  update(point: Point) {
    this.radius = distanceBetweenPoints(this.centre, point);
    this.selection().attr("r", this.radius);
  }
}
