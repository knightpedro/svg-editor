import { v4 as uuid } from "uuid";

export abstract class Graphic {
  id: string;

  constructor() {
    this.id = uuid();
  }
}
