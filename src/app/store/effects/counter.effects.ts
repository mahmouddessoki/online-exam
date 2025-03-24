import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { INCREMENT } from "../actions/counter.actions";
import { tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { counterSelector } from "../selectors/counter.selector";


export class counterEffects {
  private readonly actions = inject(Actions)
  private readonly store = inject(Store)


  saveCount = createEffect(
    () => this.actions.pipe(
      ofType(INCREMENT),
      withLatestFrom(this.store.select(counterSelector)),
      tap(([action, counter]) => {
        localStorage.setItem('count', counter.toString())
      })
    ),
    {dispatch:false}
  )
}
