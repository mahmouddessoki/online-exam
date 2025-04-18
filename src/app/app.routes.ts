import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from './core/authentication/components/forget-password/forget-password.component';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { RegisterComponent } from './core/authentication/components/register/register.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './core/layouts/user-layout/user-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { userGuard } from './core/guards/user.guard';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { ExamListComponent } from './features/exams/components/exam-list/exam-list.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, canActivate: [authGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgot-password', component: ForgetPasswordComponent, title: 'forget-password' },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '', component: UserLayoutComponent, canActivate: [userGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, title: "home" },
      { path: 'test', component: TestComponent, title: "home" },
      { path: 'exams/:name/:id', component: ExamListComponent, title: "exams" }
    ]
  }
];
