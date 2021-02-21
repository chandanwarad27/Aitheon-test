export class Option {
  id: number;
  name: string;
  isAnswer: boolean;
  selected: boolean;

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.isAnswer = false;
    this.selected = false;
  }
}
