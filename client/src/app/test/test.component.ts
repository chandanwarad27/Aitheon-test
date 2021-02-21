import { Component, OnInit, NgModule } from "@angular/core";
import { QuizService } from "../services/quiz.service";
import { Question, Quiz, Option } from "../models/index";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
  providers: [QuizService],
})
export class TestComponent implements OnInit {
  quiz: Quiz = new Quiz(null);
  mode = "quiz";
  quizName: string;
  pager = {
    index: 0,
    size: 1,
    count: 1,
  };

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizName = this.quizService.getPath();
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe((res) => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
    });
    this.mode = "quiz";
  }

  get filteredQuestions() {
    return this.quiz.questions
      ? this.quiz.questions.slice(
          this.pager.index,
          this.pager.index + this.pager.size
        )
      : [];
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = "quiz";
      console.log(this.quiz);
    }
  }
}
