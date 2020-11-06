import { pointFromEvent } from "../../dist/utils/index";
import { Rect } from "../graphics/Rect";
import { Point } from "../interfaces/Point";
import { DrawingTool, NotifyCompletionCallback } from "./DrawingTool";

export class RectangleTool extends DrawingTool {
  rect = new Rect();
  private firstClick = true;

  activate(notifyCompletion: NotifyCompletionCallback): void {
    this.notifyCompletion = notifyCompletion;
    this.canvas.register("click", this.handleClick.bind(this));
  }

  cancel(): void {
    this.deactivate();
    this.canvas.removeGraphic(this.rect.id);
  }

  complete(): void {
    this.deactivate();
    const command = new DrawRectangleCommand();
    this.notifyCompletion(command);
  }

  deactivate(): void {
    this.canvas.unregister("click", this.handleClick); // Does binding matter??
    this.canvas.unregister("mousemove", this.handleMouseMove);
  }

  handleClick(e: MouseEvent): void {
    const clientPoint = pointFromEvent(e);
    const canvasPoint = this.canvas.localPoint(clientPoint);
    if (this.firstClick) {
      this.rect.x = canvasPoint.x;
      this.rect.y = canvasPoint.y;
      this.canvas.drawRect(this.rect);
      this.canvas.register("mousemove", this.handleMouseMove.bind(this));
      this.firstClick = false;
    } else {
      this.update(canvasPoint);
      this.complete();
    }
  }

  handleMouseMove(e: MouseEvent): void {
    const clientPoint = pointFromEvent(e);
    const canvasPoint = this.canvas.localPoint(clientPoint);
    this.update(canvasPoint);
  }

  update(point: Point): void {
    const x = Math.min(this.rect.x, point.x);
    const y = Math.min(this.rect.y, point.y);
    const width = Math.abs(this.rect.x - point.x);
    const height = Math.abs(this.rect.y - point.y);
    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;
    this.canvas.updateGraphic(this.rect);
  }
}
