export interface Command {
  cancel: () => void;
  execute: (notify: () => void) => void;
}
