import { DrawCommand } from "../commands";
import { Circle } from "../graphics";
import { Point } from "../interfaces";
import { distanceBetweenPoints, pointFromEvent } from "../utils";
import { DrawingTool, NotifyCompletionCallback } from "./DrawingTool";

export class CircleTool extends DrawingTool {
  private circle = new Circle();
  private firstClick = true;

  activate(notifyCompletion: NotifyCompletionCallback): void {
    this.notifyCompletion = notifyCompletion;
    this.canvas.register("click", this.handleClick);
  }

  cancel(): void {
    this.deactivate();
    this.canvas.removeGraphic(this.circle.id);
  }

  complete(): void {
    this.deactivate();
    const command = new DrawCommand(this.canvas, this.circle);
    this.notifyCompletion(command);
  }

  deactivate(): void {
    this.canvas.unregister("click", this.handleClick);
    this.canvas.unregister("mousemove", this.handleMouseMove);
  }

  handleClick = (evt: Event): void => {
    const e = evt as MouseEvent;
    const clientPoint = pointFromEvent(e);
    const canvasPoint = this.canvas.localPoint(clientPoint);
    if (this.firstClick) {
      this.circle.x = canvasPoint.x;
      this.circle.y = canvasPoint.y;
      this.canvas.draw(this.circle);
      this.canvas.register("mousemove", this.handleMouseMove);
      this.firstClick = false;
    } else {
      this.update(canvasPoint);
      this.complete();
    }
  };

  handleMouseMove = (evt: Event): void => {
    const e = evt as MouseEvent;
    const clientPoint = pointFromEvent(e);
    const canvasPoint = this.canvas.localPoint(clientPoint);
    this.update(canvasPoint);
  };

  update(point: Point): void {
    this.circle.r = distanceBetweenPoints(point, this.circle);
    this.canvas.updateGraphic(this.circle);
  }
}

// import { select } from "d3-selection";
// import { DrawingTool } from "./DrawingTool";
// import { Point } from "../interfaces/Point";
// import { distanceBetweenPoints, SVGPointFromEvent } from "../utils/index";

// export class DrawCircle extends DrawingTool {
//   centre: Point = { x: 0, y: 0 };
//   radius = 0;
//   notifyComplete = () => {};
//   firstClick = true;

//   static createIcon() {
//     const icon = document.createElement("button");
//     icon.innerHTML = "Circle";
//     return icon;
//   }

//   activate() {
//     this.svg.addEventListener("click", this.handleClick);
//   }

//   cancel() {
//     this.deactivate();
//     this.selection().remove();
//   }

//   complete() {
//     this.deactivate();
//     this.selection().classed("preview", false);
//     this.notifyComplete();
//   }

//   createPreview() {
//     select(this.svg)
//       .append("circle")
//       .attr("data-id", this.id)
//       .attr("cx", this.centre.x)
//       .attr("cy", this.centre.y)
//       .classed("preview", true);
//   }

//   deactivate() {
//     this.svg.removeEventListener("click", this.handleClick);
//     this.svg.removeEventListener("mousemove", this.handleMouseMove);
//   }

//   execute(notify: () => void) {
//     this.notifyComplete = notify;
//     this.activate();
//   }

//   handleClick = (e: MouseEvent) => {
//     const point = SVGPointFromEvent(e, this.svg);
//     if (this.firstClick) {
//       this.centre = point;
//       this.firstClick = false;
//       this.createPreview();
//       this.svg.addEventListener("mousemove", this.handleMouseMove);
//     } else {
//       this.update(point);
//       this.complete();
//     }
//   };

//   handleMouseMove = (e: MouseEvent) => {
//     const point = SVGPointFromEvent(e, this.svg);
//     this.update(point);
//   };

//   update(point: Point) {
//     this.radius = distanceBetweenPoints(this.centre, point);
//     this.selection().attr("r", this.radius);
//   }
// }
