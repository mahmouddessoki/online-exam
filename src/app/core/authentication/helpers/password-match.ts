import { AbstractControl } from "@angular/forms"

export const passwordMisMatch = (controls: AbstractControl) => {
  return controls.get('password')?.value === controls.get('rePassword')?.value
    ? null : { mismatch: true }
}
