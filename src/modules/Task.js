export default class Task {
  #name;
  #dueDate;
  constructor(name, dueDate) {
    this.#name = name;
    this.#dueDate = dueDate;
  }

  set name(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}