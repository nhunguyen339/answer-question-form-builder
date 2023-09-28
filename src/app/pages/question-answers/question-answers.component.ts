import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionTypes } from 'src/app/enums/question-type';
import { QuestionFormArrayInterface, QuestionFormInterface } from 'src/app/interfaces/question-form';
import { AnswerQuestionService } from 'src/app/services/answer-question/answer-question-service.service';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss'],
})
export class QuestionAnswersComponent implements OnInit {
  fields: QuestionFormArrayInterface[] | undefined;

  questionTypes = QuestionTypes;

  constructor(
    private answerQuestionService: AnswerQuestionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.answerQuestionService.answerQuestionObservable.subscribe(
      (value: QuestionFormInterface | undefined) => {
        this.fields = value?.field_array;
        console.log('value: ', value);
      }
    );
  }

  navigateToFormBuilder() {
    this.router.navigateByUrl('/form/builder');
  }
}
