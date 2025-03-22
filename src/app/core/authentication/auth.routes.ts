import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';

export const authRoutes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifyCode', component: VerifyCodeComponent, title: 'Verify Code' },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: '', component: LoginComponent }
];
