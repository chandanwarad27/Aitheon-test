import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TestComponent } from "./test/test.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [AppComponent, TestComponent, LoginComponent, ResultsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
