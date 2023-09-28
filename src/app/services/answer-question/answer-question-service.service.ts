import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionFormInterface } from 'src/app/interfaces/question-form';

@Injectable({
  providedIn: 'root'
})
export class AnswerQuestionService {
  private answerQuestionSubject = new BehaviorSubject<QuestionFormInterface | undefined>(undefined)
  public answerQuestionObservable = this.answerQuestionSubject.asObservable();

  constructor() { }

  saveAnswerQuestion(value: QuestionFormInterface) {
    this.answerQuestionSubject.next(value)
  }
}
