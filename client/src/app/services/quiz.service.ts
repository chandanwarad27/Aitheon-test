import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Quiz } from "../models";

@Injectable({ providedIn: "root" })
export class QuizService {
  private readonly resultsStoreKey = "results";
  private readonly userStoreKey = "currentUser";

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(url);
  }

  getPath() {
    return "/api/questions";
  }

  submitQuiz(quiz: Quiz) {
    const user = localStorage.getItem(this.userStoreKey);
    quiz.user = user;
    const storageResult = localStorage.getItem(this.resultsStoreKey);
    let allResults = [];
    if (storageResult) {
      allResults = [...JSON.parse(storageResult), quiz];
    } else {
      allResults.push(quiz);
    }
    localStorage.setItem(this.resultsStoreKey, JSON.stringify(allResults));
  }

  getAllQuiz(): Quiz[] {
    try {
      return JSON.parse(localStorage.getItem(this.resultsStoreKey));
    } catch (err) {
      localStorage.setItem(this.resultsStoreKey, JSON.stringify([]));
      return [];
    }
  }

  clearUser() {
    localStorage.removeItem(this.userStoreKey);
  }

  setUser(user: string) {
    this.clearExistingQuiz(user);
    localStorage.setItem(this.userStoreKey, user.trim());
  }

  getCurrentUser() {
    return localStorage.getItem(this.userStoreKey);
  }

  private clearExistingQuiz(user: string) {
    const allQuiz = this.getAllQuiz();
    if (typeof allQuiz === "undefined" || allQuiz === null) return;

    const userIndex = allQuiz.findIndex((uq) => uq.user === user);
    if (userIndex !== -1) {
      allQuiz.splice(userIndex, 1);
      localStorage.setItem(this.resultsStoreKey, JSON.stringify(allQuiz));
    }
  }
}
