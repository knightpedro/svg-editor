import { Command } from "./commands/Command";
import { DrawCircle } from "./commands/DrawCircle";
import { DrawingTool } from "./commands/DrawingTool";
import { DrawRectangle } from "./commands/DrawRectangle";

const XMLNS = "http://www.w3.org/2000/svg";
const toolbarItems = [DrawRectangle, DrawCircle];

interface SVGEditorOptions {
  toolbarItems: typeof DrawingTool[];
}

class SVGEditor {
  container: HTMLDivElement;
  activeCommand: Command | null = null;
  options: SVGEditorOptions;

  constructor(el: HTMLDivElement, options: SVGEditorOptions) {
    this.container = el;
    this.options = options;

    const toolbar = document.createElement("div");
    toolbar.setAttribute("class", "svg-editor-toolbar");

    const canvas = document.createElement("div");
    canvas.setAttribute("class", "svg-editor-canvas");

    const svg = document.createElementNS(XMLNS, "svg");
    canvas.appendChild(svg);

    this.options.toolbarItems.map((item) => {
      const icon = item.createIcon();
      icon.addEventListener("click", () => {
        this.activeCommand?.cancel();
        this.activeCommand = new item(svg);
        this.activeCommand.execute(this.onCommandComplete.bind(this));
      });
      toolbar.appendChild(icon);
    });

    this.container.appendChild(toolbar);
    this.container.appendChild(canvas);
  }

  onCommandComplete() {
    this.activeCommand = null;
  }
}

function svgEditor(el: HTMLDivElement) {
  return new SVGEditor(el, { toolbarItems });
}

export default svgEditor;
