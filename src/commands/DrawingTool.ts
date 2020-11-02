import { Command } from "./Command";
import { v4 as uuid } from "uuid";
import { select } from "d3-selection";

export class DrawingTool implements Command {
  svg: SVGSVGElement;
  id: string;

  static createIcon: () => HTMLButtonElement;

  constructor(svg: SVGSVGElement) {
    this.svg = svg;
    this.id = uuid();
  }

  cancel() {}

  execute(notify: () => void) {}

  selection() {
    return select(`[data-id="${this.id}"]`);
  }
}
