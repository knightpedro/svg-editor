import { Command } from "./commands/Command";
import { DrawRectangle } from "./commands/DrawRectangle";

const XMLNS = "http://www.w3.org/2000/svg";
const toolbarItems = [DrawRectangle];

class SVGEditor {
  container: HTMLDivElement;
  activeCommand: Command | null = null;

  constructor(el: HTMLDivElement) {
    this.container = el;

    const toolbar = document.createElement("div");
    toolbar.setAttribute("class", "svg-editor-toolbar");

    const canvas = document.createElement("div");
    canvas.setAttribute("class", "svg-editor-canvas");

    const svg = document.createElementNS(XMLNS, "svg");
    canvas.appendChild(svg);

    toolbarItems.map((item) => {
      const icon = item.createIcon();
      icon.addEventListener("click", () => {
        const tool = new item(svg);
        tool.execute();
        // Need to be able to tell when command has finished executing

        // The command should be "add this rectangle to the SVG" not "start drawing"
      });
      toolbar.appendChild(icon);
    });

    this.container.appendChild(toolbar);
    this.container.appendChild(canvas);
  }
}

function svgEditor(el: HTMLDivElement) {
  return new SVGEditor(el);
}

export default svgEditor;
