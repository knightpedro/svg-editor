import { SVGCanvas } from "./canvas";
import { Canvas, Command } from "./interfaces";
import { DrawingTool, RectangleTool, CircleTool, LineTool } from "./tools";
import { Stack } from "./types";

const toolbarItems = [
  { name: "Line", tool: LineTool },
  { name: "Circle", tool: CircleTool },
  { name: "Rect", tool: RectangleTool },
];

class SVGEditor {
  activeTool: DrawingTool | null = null;
  container: HTMLDivElement;
  canvas: Canvas;
  undoStack = new Stack<Command>(5);
  redoStack = new Stack<Command>(5);
  undoButton: HTMLButtonElement;
  redoButton: HTMLButtonElement;

  constructor(container: HTMLDivElement) {
    this.container = container;

    const toolbar = document.createElement("div");
    toolbar.setAttribute("class", "svg-editor-toolbar");

    const canvasContainer = document.createElement("div");
    canvasContainer.setAttribute("class", "svg-editor-canvas");

    this.canvas = new SVGCanvas(canvasContainer);

    toolbarItems.map((item) => {
      const btn = document.createElement("button");
      btn.setAttribute("title", item.name);
      btn.innerHTML = item.name;
      btn.addEventListener("click", () => {
        this.activeTool?.cancel();
        this.activeTool = new item.tool(this.canvas);
        this.activeTool.activate(this.onToolComplete);
      });
      toolbar.appendChild(btn);
    });

    this.undoButton = document.createElement("button");
    this.undoButton.innerHTML = "Undo";
    this.undoButton.disabled = true;
    this.undoButton.addEventListener("click", () => {
      this.undo();
    });

    this.redoButton = document.createElement("button");
    this.redoButton.innerHTML = "Redo";
    this.redoButton.disabled = true;
    this.redoButton.addEventListener("click", () => {
      this.redo();
    });

    toolbar.appendChild(this.undoButton);
    toolbar.appendChild(this.redoButton);

    this.container.appendChild(toolbar);
    this.container.appendChild(canvasContainer);
  }

  onToolComplete = (command: Command): void => {
    this.undoStack.push(command);
    this.redoStack.clear();
    this.activeTool = null;
    this.updateUndoRedoButtons();
  };

  undo() {
    this.activeTool?.cancel();
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
    this.updateUndoRedoButtons();
  }

  redo() {
    this.activeTool?.cancel();
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
    this.updateUndoRedoButtons();
  }

  updateUndoRedoButtons() {
    this.undoButton.disabled = this.undoStack.isEmpty;
    this.redoButton.disabled = this.redoStack.isEmpty;
  }
}

function svgEditor(el: HTMLDivElement) {
  return new SVGEditor(el);
}

export default svgEditor;
