export interface QuestionFormInterface {
  field_array: QuestionFormArrayInterface[];
}

export interface QuestionFormArrayInterface {
  display_allow_specify_answer: boolean;
  allow_specify_answer: boolean;
  specify_answer: string;
  label: string;
  is_required: boolean;
  type: string;
  answer: any;
}
