import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { saveUserData } from "../actions/auth.actions";


export class authEffects {
  private readonly actions = inject(Actions)
  saveToken = createEffect(
    () => this.actions.pipe(
      ofType(saveUserData),
      tap((action) => {
        if (action.user && action.user.token) {
          localStorage.setItem("examToken", action.user.token);
        }
      })
    ),
    { dispatch: false }
  )
}
