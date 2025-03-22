import { FormControl } from "@angular/forms";

 export const phoneValidate = (controls:FormControl)=>{
      const phone = controls.value;
      const phoneRegex = /^01[0-5]\d{8}$/
      if (phoneRegex.test(phone) || !phone) {
        return null;
      }
      return { phoneInvalid: true };
    }
