import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionAnswersComponent } from './pages/question-answers/question-answers.component';
import { QuestionBuilderComponent } from './pages/question-builder/question-builder.component';

const routes: Routes = [{
  path: 'form',
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'builder',
    },
    {
      path: "builder",
      component: QuestionBuilderComponent
    },
    {
      path: "answers",
      component: QuestionAnswersComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
