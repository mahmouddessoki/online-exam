import { createReducer, on } from "@ngrx/store";
import { saveUserAnswers, userAnswers } from "../actions/userAns.actions";

const initialState: userAnswers = {} as userAnswers;
export const answersReducer = createReducer(
  initialState,
  on(saveUserAnswers, (state, action) => action.user)
)
