import { Canvas } from "../interfaces/Canvas";
import { Command } from "../interfaces/Command";

export type NotifyCompletionCallback = (command?: Command) => void;

export abstract class DrawingTool {
  protected canvas: Canvas;
  protected notifyCompletion: NotifyCompletionCallback = () => {};

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  abstract activate(notifyCompletion: NotifyCompletionCallback): void;

  abstract cancel(): void;
}
