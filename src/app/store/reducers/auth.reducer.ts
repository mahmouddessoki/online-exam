import { createReducer, on } from "@ngrx/store";
import { saveUserData, userData } from "../actions/auth.actions";

const initialState: userData = {} as userData;
export const authReducer = createReducer(
  initialState,
  on(saveUserData,(state,action)=>action.user)
)
