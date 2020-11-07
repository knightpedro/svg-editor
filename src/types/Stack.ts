export class Stack<T> {
  private storage: T[] = [];
  private capacity: number;

  constructor(capacity = 10) {
    this.capacity = capacity;
  }

  get isEmpty(): boolean {
    return this.storage.length < 1;
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  push(item: T): void {
    if (this.storage.length >= this.capacity) this.storage.shift();
    this.storage.push(item);
  }

  peek(): T | undefined {
    return this.storage[this.storage.length - 1];
  }

  clear(): void {
    this.storage = [];
  }
}
