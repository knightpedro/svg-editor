import { pointFromEvent } from "../../dist/utils/index";
import { Rect } from "../graphics/Rect";
import { Point } from "../interfaces/Point";
import { DrawingTool, NotifyCompletionCallback } from "./DrawingTool";

export class RectangleTool extends DrawingTool {
  rect = new Rect();
  private firstClick = true;

  activate(notifyCompletion: NotifyCompletionCallback): void {
    this.notifyCompletion = notifyCompletion;
    this.canvas.register('click', this.handleClick.bind(this));
  }

  cancel(): void {
    this
  }

  handleClick(e: MouseEvent) {
      const clientPoint = pointFromEvent(e);
      const canvasPoint = this.canvas.localPoint(clientPoint);
      if (this.firstClick) {
          this.rect.origin = canvasPoint;
          this.canvas.drawRect(this.rect);
          this.canvas.register("mousemove", this.handleMouseMove.bind(this))
          this.firstClick = false;
      }
      else {
          this.
      }
  }

  handleMouseMove(e: MouseEvent) {

  }

  update(point: Point) {
    const x = Math.min(this.rect.x, point.x);
    const y = Math.min(this.rect.y, point.y);
    const width = Math.abs(this.rect.x - this.termination.x);
    const height = Math.abs(this.origin.y - this.termination.y);
  }
}
