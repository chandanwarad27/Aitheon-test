import { Question } from './question';

export class Quiz {
  response_code: string;
  questions: Question[];

  constructor(data: any) {
    if (data) {
      this.response_code = data.response_code;
      this.questions = [];
      data.results.forEach((question) => {
        this.questions.push(new Question(question));
      });
    }
  }
}
