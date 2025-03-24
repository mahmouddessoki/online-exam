import { createAction, props } from "@ngrx/store";
export interface  userData{
  token : string;
  userEmail : string;
}

export const saveUserData = createAction(
  '[auth] saveUserData',
  props<{ user: userData }>()
)
