import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthApiService } from 'auth-api';
import { Subscription } from 'rxjs';
import { saveUserData } from '../../../../store/actions/auth.actions';
import { FormBtnComponent } from "../../../layouts/auth-layout/components/form-btn/form-btn.component";
import { ResponseMsgComponent } from "../../../layouts/auth-layout/components/response-msg/response-msg.component";
import { InputAlertDirective } from '../../directives/input-alert.directive';
import { globalValidator } from '../../helpers/global-validators';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective,
    ResponseMsgComponent,
    FormBtnComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authApiService = inject(AuthApiService)
  private readonly authService = inject(AuthService)
  private readonly store = inject(Store)
  authForm!: FormGroup;
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();
  resMsg!: string;
  passwordFlag: boolean = false;
  rePasswordFlag: boolean = false;

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.authForm = this.fb.group({
      email: [null, globalValidator.emailValidate],
      password: [null, globalValidator.passwordValidate],
    });
  }


  login() {
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    let data = this.authForm.value;
    this.subscription = this.authApiService.login(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.resMsg = res.message;
        this.authService.saveUserEmail(this.authForm.get('email')?.value)
        this.store.dispatch(saveUserData({
          user: {
            token: res.token,
          }
        }))

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500)
      },
      error: (err) => {
        this.isLoading = false;
        this.resMsg = err.error.message;

      }
    })

  }

  showPassword(pass: string = '') {
    if (pass) {
      this.rePasswordFlag = !this.rePasswordFlag;
    } else {
      this.passwordFlag = !this.passwordFlag;
    }

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
