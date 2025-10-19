import * as i0 from '@angular/core';
import { InjectionToken, Injectable, inject } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import * as i1 from '@angular/common/http';

class AuthEndPoint {
    static LOGIN = 'auth/signin';
    static SIGNUP = 'auth/signup';
    static CHANGE_PASSWORD = 'auth/changePassword';
    static DELETE_ACCOUNT = 'auth/deleteMe';
    static EDIT_PROFILE = 'auth/editProfile';
    static LOGOUT = 'auth/logout';
    static LOGGED_INFO = 'auth/profileData';
    static FORGET_PASSWORD = 'auth/forgotPassword';
    static RESET_PASSWORD = 'auth/resetPassword';
    static VERIFY_CODE = 'auth/verifyResetCode';
}

const BASE_URL = new InjectionToken('BASE_URL');

class AuthAPIAdaptorService {
    constructor() { }
    adapt(data) {
        return {
            message: data.message,
            token: data.token,
            userEmail: data.user.email,
        };
    }
    codeResAdapt(data) {
        return {
            message: data.message,
        };
    }
    setPassAdapt(data) {
        return {
            message: data.message,
            token: data.token,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthAPIAdaptorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthAPIAdaptorService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthAPIAdaptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class AuthApiService {
    httpClient;
    authAPIAdaptorService;
    base_url = inject(BASE_URL);
    constructor(httpClient, authAPIAdaptorService) {
        this.httpClient = httpClient;
        this.authAPIAdaptorService = authAPIAdaptorService;
    }
    login(data) {
        return this.httpClient.post(`${this.base_url}${AuthEndPoint.LOGIN}`, data).pipe(map((res) => this.authAPIAdaptorService.adapt(res)));
    }
    register(data) {
        return this.httpClient.post(`${this.base_url}${AuthEndPoint.SIGNUP}`, data).pipe(map((res) => this.authAPIAdaptorService.adapt(res)), catchError((err) => throwError(err)));
    }
    forgetPass(data) {
        return this.httpClient.post(`${this.base_url}${AuthEndPoint.FORGET_PASSWORD}`, data).pipe(map((res) => this.authAPIAdaptorService.codeResAdapt(res)), catchError((err) => throwError(err)));
    }
    verifyCode(data) {
        return this.httpClient.post(`${this.base_url}${AuthEndPoint.VERIFY_CODE}`, data).pipe(map((res) => {
            return { status: res.status };
        }), catchError((err) => throwError(err)));
    }
    setPassword(data) {
        return this.httpClient.put(`${this.base_url}${AuthEndPoint.RESET_PASSWORD}`, data).pipe(map((res) => this.authAPIAdaptorService.setPassAdapt(res)), catchError((err) => throwError(err)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthApiService, deps: [{ token: i1.HttpClient }, { token: AuthAPIAdaptorService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthApiService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.15", ngImport: i0, type: AuthApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: AuthAPIAdaptorService }] });

/*
 * Public API Surface of auth-api
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthApiService, BASE_URL };
//# sourceMappingURL=auth-api.mjs.map
