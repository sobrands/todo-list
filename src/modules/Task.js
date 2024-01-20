export default class Task {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
  }

  get date() {
    this.dueDate.replace('/','-');
    return new Date(this.dueDate);
  }
}