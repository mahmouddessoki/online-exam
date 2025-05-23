import { createAction, props } from "@ngrx/store";
export interface userData {
  token: string | null;
}
export const saveUserData = createAction(
  'saveUserData',
  props<{ user: userData }>()
)
