import { Action, createAction, props } from "@ngrx/store";

export const INCREMENT = '[counter] increment'
export const DECREMENT = '[counter] decrement'
// export type counterActions = increment | decrement;
export const increment = createAction(
  INCREMENT,
  props<{ value: number }>()
)

export const decrement = createAction(
  DECREMENT,
  props<{ value: number }>()
)

// export class increment implements Action {
//   readonly type = INCREMENT;
//   constructor(public value: number) {}
// }

// export class decrement implements Action {
//   readonly type = DECREMENT;
//   constructor(public value: number) {}
// }
