import { Graphic } from "../graphics";
import { Canvas, Command } from "../interfaces";

export class DrawCommand implements Command {
  private canvas: Canvas;
  private graphic: Graphic;

  constructor(canvas: Canvas, graphic: Graphic) {
    this.canvas = canvas;
    this.graphic = graphic;
  }

  execute(): void {
    this.canvas.draw(this.graphic);
  }

  undo(): void {
    this.canvas.removeGraphic(this.graphic.id);
  }
}
