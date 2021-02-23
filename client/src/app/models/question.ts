import { Option } from "./option";

export class Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  options: Option[];
  answered: boolean;

  constructor(data: any) {
    data = data || {};
    this.category = data.category;
    this.type = data.type;
    this.difficulty = data.difficulty;
    this.question = data.question;
    this.correct_answer = data.correct_answer;
    this.options = [];
    this.options.push(new Option(0, this.correct_answer, true));
    data.incorrect_answers.forEach((value, index) => {
      this.options.push(new Option(index + 1, value, false));
    });
  }
}
