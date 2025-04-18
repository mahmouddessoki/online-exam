import { createAction, props } from "@ngrx/store";
export interface userAnswers {
  [questionId: string]: string | string[]
}

export const saveUserAnswers = createAction(
  'saveUserAnswers',
  props<{ user: userAnswers }>()
)
