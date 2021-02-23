import { Component, OnInit } from "@angular/core";
import { Question, Quiz } from "../models";
import { QuizService } from "../services/quiz.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  allQuiz: Quiz[];

  constructor(private quizService: QuizService) {}

  ngOnInit() {}

  isCorrect(question: Question) {
    return question.options.every((x) => x.selected === x.isAnswer) ? "1" : "0";
  }

  calcTotPts(quiz: Quiz) {
    const result = quiz.questions
      .map((x) => x.options.every((op) => op.selected === op.isAnswer))
      .filter(Boolean).length;
    console.log(result);
    return result;
  }
}
