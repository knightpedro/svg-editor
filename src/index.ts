import { SVGCanvas } from "./canvas";
import { Canvas, Command } from "./interfaces";
import { DrawingTool, RectangleTool, CircleTool } from "./tools";

const TOOL_TYPES = [RectangleTool, CircleTool];

class SVGEditor {
  activeTool: DrawingTool | null = null;
  container: HTMLDivElement;
  commands: Command[] = [];
  canvas: Canvas;

  constructor(container: HTMLDivElement) {
    this.container = container;

    const toolbar = document.createElement("div");
    toolbar.setAttribute("class", "svg-editor-toolbar");

    const canvasContainer = document.createElement("div");
    canvasContainer.setAttribute("class", "svg-editor-canvas");

    this.canvas = new SVGCanvas(canvasContainer);

    TOOL_TYPES.map((t) => {
      const btn = document.createElement("button");
      btn.addEventListener("click", () => {
        const tool = new t(this.canvas);
        tool.activate(this.onToolComplete);
      });
      toolbar.appendChild(btn);
    });

    this.container.appendChild(toolbar);
    this.container.appendChild(canvasContainer);
  }

  onToolComplete = (command: Command): void => {
    this.commands.push(command);
    this.activeTool = null;
  };
}

function svgEditor(el: HTMLDivElement) {
  return new SVGEditor(el);
}

export default svgEditor;
