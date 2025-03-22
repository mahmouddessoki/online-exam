import { Validators } from "@angular/forms";
import { phoneValidate } from "./phone.validate";
import { nameValidate } from "./name-validate";

export const globalValidator = {
  nameValidate:  [Validators.required, nameValidate],
  emailValidate:  [Validators.required, Validators.email],
  passwordValidate: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)],
  codeNum: [Validators.required, Validators.pattern(/^[0-9]{1}$/), Validators.maxLength(1)],
  phoneValidate: [Validators.required, phoneValidate],
}
