export default class Project {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}