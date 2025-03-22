import { FormControl } from "@angular/forms";

export const nameValidate = (controls: FormControl) => {
  const name = controls.value;
  const nameRegex = /^[a-zA-Z]+$/
  if (nameRegex.test(name) || !name) {
    return null;
  }
  return { nameInvalid: true };
}
