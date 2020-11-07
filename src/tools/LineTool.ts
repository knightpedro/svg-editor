import { DrawCommand } from "../commands";
import { Line } from "../graphics";
import { Point } from "../interfaces";
import { pointFromEvent } from "../utils";
import { DrawingTool, NotifyCompletionCallback } from "./DrawingTool";

export class LineTool extends DrawingTool {
  private line = new Line();
  private firstClick = true;

  activate(notifyCompletion: NotifyCompletionCallback): void {
    this.notifyCompletion = notifyCompletion;
    this.canvas.register("click", this.handleClick);
  }

  cancel(): void {
    this.deactivate();
    this.canvas.removeGraphic(this.line.id);
  }

  complete(): void {
    this.deactivate();
    const command = new DrawCommand(this.canvas, this.line);
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
      this.line.start = canvasPoint;
      this.line.end = canvasPoint;
      this.canvas.draw(this.line);
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
    this.line.end = point;
    this.canvas.updateGraphic(this.line);
  }
}
