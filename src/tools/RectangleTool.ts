import { pointFromEvent } from "../utils";
import { DrawCommand } from "../commands";
import { Rect } from "../graphics";
import { Point } from "../interfaces";
import { DrawingTool, NotifyCompletionCallback } from "./DrawingTool";

export class RectangleTool extends DrawingTool {
  private rect = new Rect();
  private origin: Point = { x: 0, y: 0 };
  private termination: Point = { x: 0, y: 0 };
  private firstClick = true;

  activate(notifyCompletion: NotifyCompletionCallback): void {
    this.notifyCompletion = notifyCompletion;
    this.canvas.register("click", this.handleClick);
  }

  cancel(): void {
    this.deactivate();
    this.canvas.removeGraphic(this.rect.id);
  }

  complete(): void {
    this.deactivate();
    const command = new DrawCommand(this.canvas, this.rect);
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
      this.origin = canvasPoint;
      this.rect.x = canvasPoint.x;
      this.rect.y = canvasPoint.y;
      this.canvas.draw(this.rect);
      this.canvas.register("mousemove", this.handleMouseMove);
      this.firstClick = false;
    } else {
      this.termination = canvasPoint;
      this.update();
      this.complete();
    }
  };

  handleMouseMove = (evt: Event): void => {
    const e = evt as MouseEvent;
    const clientPoint = pointFromEvent(e);
    this.termination = this.canvas.localPoint(clientPoint);
    this.update();
  };

  update(): void {
    this.rect.x = Math.min(this.origin.x, this.termination.x);
    this.rect.y = Math.min(this.origin.y, this.termination.y);
    this.rect.width = Math.abs(this.origin.x - this.termination.x);
    this.rect.height = Math.abs(this.origin.y - this.termination.y);
    this.canvas.updateGraphic(this.rect);
  }
}
