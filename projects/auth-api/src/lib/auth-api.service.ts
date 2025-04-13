import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthAPIAdaptorService } from './adaptor/auth-apiadaptor.service';
import { AuthAPI } from './base/AuthAPI';
import { AuthEndPoint } from './enums/authAPI.endPoints';
import { ForgetData } from './interfaces/forget-data';
import { msgRes } from './interfaces/forget-res';
import { LoginData } from './interfaces/login-data';
import { authRes } from './interfaces/login-res';
import { RegisterData } from './interfaces/register-data';
import { SetPassData } from './interfaces/set-pass-data';
import { VerifyData } from './interfaces/verify-data';
import { VerifyRes } from './interfaces/verify-res';
import { BASE_URL } from './url.injection';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthAPI {
  private readonly base_url = inject(BASE_URL)
  constructor(private httpClient: HttpClient,
    private authAPIAdaptorService: AuthAPIAdaptorService) { }
  login(data: LoginData): Observable<authRes> {
    return this.httpClient.post(`${this.base_url}${AuthEndPoint.LOGIN}`, data).pipe(
      map((res: any) => this.authAPIAdaptorService.adapt(res))
    )
  }
  register(data: RegisterData): Observable<authRes> {
    return this.httpClient.post(`${this.base_url}${AuthEndPoint.SIGNUP}`, data).pipe(
      map((res: any) => this.authAPIAdaptorService.adapt(res)),
      catchError((err) => throwError(err))
    )
  }
  forgetPass(data: ForgetData): Observable<msgRes> {
    return this.httpClient.post(`${this.base_url}${AuthEndPoint.FORGET_PASSWORD}`, data).pipe(
      map((res: any) => this.authAPIAdaptorService.codeResAdapt(res)),
      catchError((err) => throwError(err))
    )
  }
  verifyCode(data: VerifyData): Observable<VerifyRes> {
    return this.httpClient.post(`${this.base_url}${AuthEndPoint.VERIFY_CODE}`, data).pipe(
      map((res: any) => {
        return { status: res.status };
      }),
      catchError((err) => throwError(err))
    )
  }
  setPassword(data: SetPassData): Observable<authRes> {
    return this.httpClient.put(`${this.base_url}${AuthEndPoint.RESET_PASSWORD}`, data).pipe(
      map((res: any) => this.authAPIAdaptorService.setPassAdapt(res)),
      catchError((err) => throwError(err))
    )

  }


}
