import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ResultsComponent } from "./results/results.component";
import { TestComponent } from "./test/test.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "test",
    component: TestComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "results",
    component: ResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
