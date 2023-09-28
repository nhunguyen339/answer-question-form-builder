import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionTypes } from 'src/app/enums/question-type';
import { QuestionFormInterface } from 'src/app/interfaces/question-form';
import { AnswerQuestionService } from 'src/app/services/answer-question/answer-question-service.service';

// interface BuildingFormInferace {
//   display_allow_specify_answer: boolean;
//   allow_specify_answer: boolean;
//   specify_answer: string;
//   label: string;
//   is_required: boolean;
//   type: string;
//   answer: any;
// }

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.scss'],
})
export class QuestionBuilderComponent implements OnInit, AfterViewInit {
  questionsForm: FormGroup = this.fb.group({ field_array: this.fb.array([]) });
  buildingForm!: FormGroup;

  questionTypeEnum = QuestionTypes;
  @ViewChild('openModalEl', { read: ElementRef }) openModalEl!: ElementRef;
  @ViewChild('closeModalEl', { read: ElementRef }) closeModalEl!: ElementRef;

  questionTypes = [
    {
      name: 'Checkbox List',
      value: QuestionTypes.CHECKBOX_LIST,
    },
    {
      name: 'Paragraph',
      value: QuestionTypes.PARAGRAPH,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private answerQuestionService: AnswerQuestionService
  ) {}

  ngOnInit() {
    this.initBuildingForm();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.openModalEl.nativeElement.click();
    }, 100);
  }

  initBuildingForm() {
    this.buildingForm = this.fb.group({
      type: ['', Validators.required],
      label: '',
      is_required: false,
      allow_specify_answer: false,
      checkbox_list: this.fb.array([]),
    });
  }

  onSelectType(value: string) {
    this.building_form_type?.setValue(value);

    if (value === QuestionTypes.CHECKBOX_LIST) {
      this.building_form_checkbox_list.push(
        this.fb.group({ name: ['', Validators.required] })
      );
    }
  }

  closeModal() {
    this.initBuildingForm();
  }

  get building_form_checkbox_list() {
    return this.buildingForm?.get('checkbox_list') as FormArray;
  }

  get building_form_label() {
    return this.buildingForm?.get('label') as FormControl;
  }

  get building_form_type() {
    return this.buildingForm?.get('type') as FormControl;
  }

  get questions_form_field_array() {
    return this.questionsForm.get('field_array') as FormArray;
  }

  get isParagraphType() {
    return this.building_form_type.value === QuestionTypes.PARAGRAPH;
  }

  get isCheckboxListType() {
    return this.building_form_type.value === QuestionTypes.CHECKBOX_LIST;
  }

  removeCheckboxItem(index: number) {
    this.building_form_checkbox_list.removeAt(index);
  }

  addNewCheckboxAnswer() {
    this.building_form_checkbox_list.push(
      this.fb.group({ name: ['', Validators.required] })
    );
  }

  get isBuildingFormValid() {
    if (this.isParagraphType) {
      return this.building_form_label.value;
    }
    if (this.isCheckboxListType) {
      return (
        this.building_form_checkbox_list.length > 0 &&
        this.building_form_checkbox_list.valid
      );
    }

    return false;
  }

  submit() {
    const value = this.buildingForm.value;
    let questionFormValue = {
      answer: null as any,
      display_allow_specify_answer: false,
      allow_specify_answer: false,
      specify_answer: '',
      label: value.label,
      is_required: value.is_required,
      type: value.type,
    };

    if (value.allow_specify_answer) {
      questionFormValue = {
        ...questionFormValue,
        display_allow_specify_answer: true,
      };
    }

    if (this.isParagraphType) {
      questionFormValue = {
        ...questionFormValue,
        answer: ['', value.is_required ? Validators.required : null],
      };
    }

    if (this.isCheckboxListType) {
      const answer = value.checkbox_list.map((checkbox: any) =>
        this.fb.group({ label: checkbox.name, value: false })
      );

      questionFormValue = {
        ...questionFormValue,
        answer: this.fb.array(answer),
      };
    }
    this.questions_form_field_array.push(this.fb.group(questionFormValue));

    this.closeModalEl.nativeElement.click();
  }

  getCheckboxList(field: AbstractControl) {
    return field.get('answer') as FormArray;
  }

  getAnswerFieldValid(field: AbstractControl) {
    return (
      field.get('answer')?.invalid &&
      (field.get('answer')?.dirty || field.get('answer')?.touched)
    );
  }

  navigateToPreviewAnswer() {
    this.answerQuestionService.saveAnswerQuestion(this.questionsForm.value);
    this.router.navigateByUrl('/form/answers');
  }
}
