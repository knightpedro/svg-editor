export interface Command {
  cancel: () => void;
  execute: () => void;
}
