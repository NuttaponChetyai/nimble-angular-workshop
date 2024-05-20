import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { QuestionCategoryComponent } from './question-category/question-category.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'categories', component: QuestionCategoryComponent },
    { path: 'question', component: QuestionDetailComponent },
    { path: '**', redirectTo: 'login' }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }