import { Component, OnInit, NgModule } from "@angular/core";
import { QuizService } from "../services/quiz.service";
import { Question, Quiz, Option } from "../models/index";
import { Router } from "@angular/router";

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

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    const user = this.quizService.getCurrentUser();
    console.log(user);
    if (!user || user.trim() === "") {
      this.router.navigate(["login"]);
      return;
    }

    this.quizName = this.quizService.getPath();
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe((res) => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.quiz.questions.forEach((question) => {
        question.options = this.shuffle(question.options);
      });
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
    }
  }

  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onSelect(question: Question, option: Option) {
    question.options.forEach((x) => {
      if (x.id !== option.id) x.selected = false;
    });
  }

  isAnswered(question: Question) {
    return question.options.find((x) => x.selected)
      ? "Answered"
      : "Not Answered";
  }

  isCorrect(question: Question) {
    return question.options.every((x) => x.selected === x.isAnswer) ? "1" : "0";
  }

  onSubmit() {
    this.mode = "result";
    this.quizService.submitQuiz(this.quiz);
    this.quizService.clearUser();
    this.router.navigate(["results"]);
  }

  calcTotPts() {
    return this.quiz.questions
      .map((x) => x.options.every((op) => op.selected === op.isAnswer))
      .filter(Boolean).length;
  }
}
