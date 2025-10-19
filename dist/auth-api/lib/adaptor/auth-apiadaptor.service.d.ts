import { Adaptor } from '../interfaces/adaptor';
import { authAPIRes, authRes } from '../interfaces/login-res';
import { ForgetAPIRes, msgRes } from '../interfaces/forget-res';
import { SetPassRes } from '../interfaces/set-pass-res';
import * as i0 from "@angular/core";
export declare class AuthAPIAdaptorService implements Adaptor {
    constructor();
    adapt(data: authAPIRes): authRes;
    codeResAdapt(data: ForgetAPIRes): msgRes;
    setPassAdapt(data: SetPassRes): authRes;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthAPIAdaptorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthAPIAdaptorService>;
}
