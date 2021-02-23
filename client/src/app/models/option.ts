export class Option {
  id: number;
  name: string;
  isAnswer: boolean;
  selected: boolean;

  constructor(id, name, isAnswer) {
    this.id = id;
    this.name = name;
    this.isAnswer = isAnswer;
    this.selected = false;
  }
}
