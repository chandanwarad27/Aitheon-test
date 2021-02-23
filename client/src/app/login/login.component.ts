import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  name: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    console.log(name);
    if (!this.name || this.name.trim() === "") {
      return alert("Invalid name");
    }
    this.router.navigate(["test"]);
  }
}
