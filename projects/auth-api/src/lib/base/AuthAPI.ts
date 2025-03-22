import { Observable } from "rxjs";
import { ForgetData } from "../interfaces/forget-data";
import { msgRes } from "../interfaces/forget-res";
import { LoginData } from "../interfaces/login-data";
import { authRes } from "../interfaces/login-res";
import { RegisterData } from "../interfaces/register-data";
import { VerifyData } from "../interfaces/verify-data";
import { SetPassData } from "../interfaces/set-pass-data";
import { VerifyRes } from "../interfaces/verify-res";

export abstract class AuthAPI {
  abstract login(data: LoginData): Observable<authRes>
  abstract register(data: RegisterData): Observable<authRes>
  abstract forgetPass(data: ForgetData): Observable<msgRes>
  abstract verifyCode(data: VerifyData): Observable<VerifyRes>
  abstract setPassword(data: SetPassData): Observable<authRes>
  abstract saveToken(token: string): void;
  abstract removeToken(): void;
}
