import { Canvas, Command } from "../interfaces";

export type NotifyCompletionCallback = (command: Command) => void;

export abstract class DrawingTool {
  protected canvas: Canvas;
  protected notifyCompletion: NotifyCompletionCallback = () => {};

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  abstract activate(notifyCompletion: NotifyCompletionCallback): void;

  abstract cancel(): void;
}
