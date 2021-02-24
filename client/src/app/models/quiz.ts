import { Question } from "./question";

export class Quiz {
  user: string;
  questions: Question[];

  constructor(data: any) {
    if (data) {
      this.questions = [];
      data.results.forEach((question) => {
        this.questions.push(new Question(question));
      });
    }
  }
}
