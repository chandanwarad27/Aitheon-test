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
    console.log(question, option);
    question.options.forEach((x) => {
      if (x.id !== option.id) x.selected = false;
    });
  }

  isAnswered(question: Question) {
    return question.options.find((x) => x.selected)
      ? "Answered"
      : "Not Answered";
  }
}
