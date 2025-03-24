import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from './core/authentication/components/forget-password/forget-password.component';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { RegisterComponent } from './core/authentication/components/register/register.component';
import { SetPasswordComponent } from './core/authentication/components/set-password/set-password.component';
import { VerifyCodeComponent } from './core/authentication/components/verify-code/verify-code.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgot-password', component: ForgetPasswordComponent, title: 'forget-password' },
      { path: 'set-password', component: SetPasswordComponent, title: 'set-password' },
      { path: 'verify', component: VerifyCodeComponent, title: 'verify code' },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];
