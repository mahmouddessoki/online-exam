import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { authAPIRes, authRes } from '../interfaces/login-res';
import { ForgetAPIRes, msgRes } from '../interfaces/forget-res';
import { VerifyRes } from '../interfaces/verify-res';
import { SetPassRes } from '../interfaces/set-pass-res';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdaptorService implements Adaptor {

  constructor() { }
  adapt(data: authAPIRes): authRes {
    return {
      message:data.message,
      token:data.token,
      userEmail:data.user.email,
    }
  }
  codeResAdapt(data: ForgetAPIRes): msgRes {
    return {
      message:data.message,
    }
  }
  setPassAdapt(data: SetPassRes): authRes {
    return {
      message: data.message,
      token: data.token,
    }
  }
}
