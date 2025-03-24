import { createReducer, on } from "@ngrx/store";
import { decrement, increment } from "../actions/counter.actions";

// import { Action } from "@ngrx/store";
// import { , DECREMENT, INCREMENT } from "../actions/counter.actions";


let initialState = 0;
export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement,(state,action)=>state - action.value)
)


// export function createReducer(state = initialState,action:counterActions | Action){
//   if (action.type == INCREMENT) {
//     return state + (action as counterActions).value;
//   }else if (action.type == DECREMENT) {
//     return state - (action as counterActions).value;
//   }
//   return state;
// }



