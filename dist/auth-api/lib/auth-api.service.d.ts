import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthAPIAdaptorService } from './adaptor/auth-apiadaptor.service';
import { AuthAPI } from './base/AuthAPI';
import { ForgetData } from './interfaces/forget-data';
import { msgRes } from './interfaces/forget-res';
import { LoginData } from './interfaces/login-data';
import { authRes } from './interfaces/login-res';
import { RegisterData } from './interfaces/register-data';
import { SetPassData } from './interfaces/set-pass-data';
import { VerifyData } from './interfaces/verify-data';
import { VerifyRes } from './interfaces/verify-res';
import * as i0 from "@angular/core";
export declare class AuthApiService implements AuthAPI {
    private httpClient;
    private authAPIAdaptorService;
    private readonly base_url;
    constructor(httpClient: HttpClient, authAPIAdaptorService: AuthAPIAdaptorService);
    login(data: LoginData): Observable<authRes>;
    register(data: RegisterData): Observable<authRes>;
    forgetPass(data: ForgetData): Observable<msgRes>;
    verifyCode(data: VerifyData): Observable<VerifyRes>;
    setPassword(data: SetPassData): Observable<authRes>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthApiService>;
}
