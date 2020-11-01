import { Command } from "./Command";
import { v4 as uuid } from "uuid";
import { Point } from "../interfaces/index";
import { SVGPointFromEvent } from "../utils/index";
import { select } from "d3";

export class DrawRectangle implements Command {
  private svg: SVGSVGElement;
  private id: string;
  private origin: Point = { x: 0, y: 0 };
  private termination: Point = { x: 0, y: 0 };
  private firstClick = true;

  constructor(svg: SVGSVGElement) {
    this.svg = svg;
    this.id = uuid();
  }

  static createIcon(): HTMLButtonElement {
    const icon = document.createElement("button");
    icon.innerHTML = "Draw Rectangle";
    return icon;
  }

  activate() {
    this.svg.addEventListener("click", this.handleClick);
  }

  cancel() {
    this.deactivate();
    this.rect().remove();
  }

  complete() {
    this.deactivate();
    this.rect().classed("preview", false);
  }

  createPreview() {
    select(this.svg)
      .append("rect")
      .attr("data-id", this.id)
      .attr("x", this.origin.x)
      .attr("y", this.origin.y)
      .classed("preview", true);
  }

  deactivate() {
    this.svg.removeEventListener("click", this.handleClick);
    this.svg.removeEventListener("mousemove", this.handleMouseMove);
  }

  execute() {
    this.activate();
  }

  handleClick = (e: MouseEvent) => {
    const point = SVGPointFromEvent(e, this.svg);
    if (this.firstClick) {
      this.origin = point;
      this.firstClick = false;
      this.createPreview();
      this.svg.addEventListener("mousemove", this.handleMouseMove);
    } else {
      this.termination = point;
      this.update();
      this.complete();
    }
  };

  handleMouseMove = (e: MouseEvent) => {
    this.termination = SVGPointFromEvent(e, this.svg);
    this.update();
  };

  rect() {
    return select(`[data-id="${this.id}"]`);
  }

  update() {
    const x = Math.min(this.origin.x, this.termination.x);
    const y = Math.min(this.origin.y, this.termination.y);
    const width = Math.abs(this.origin.x - this.termination.x);
    const height = Math.abs(this.origin.y - this.termination.y);
    this.rect()
      .attr("x", x)
      .attr("y", y)
      .attr("width", width)
      .attr("height", height);
  }
}
