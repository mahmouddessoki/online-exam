import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthApiService } from 'dessoki-auth-api';
import { Subscription } from 'rxjs';
import { saveUserData } from '../../../../store/actions/auth.actions';
import { FormBtnComponent } from "../../../layouts/auth-layout/components/form-btn/form-btn.component";
import { ResponseMsgComponent } from "../../../layouts/auth-layout/components/response-msg/response-msg.component";
import { InputAlertDirective } from '../../directives/input-alert.directive';
import { globalValidator } from '../../helpers/global-validators';
import { passwordMisMatch } from '../../helpers/password-match';
import { AuthService } from '../../services/auth.service';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

@Component({
  selector: 'app-set-password',
  imports: [
    ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective,
    FormBtnComponent,
    ResponseMsgComponent
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {
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

      password: [null, globalValidator.passwordValidate],
      rePassword: [null],
    }, { validators: passwordMisMatch });
  }

  setPass() {

    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      this.authForm.get('password')?.setValue('');
      return;
    }
    this.isLoading = true;
    let data = {
      email: this.authService.getUserEmail()!,
      newPassword: this.authForm.get('password')?.value,
    };
    console.log(data);
    this.subscription = this.authApiService.setPassword(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.resMsg = res.message;
        this.store.dispatch(saveUserData({
          user: {
            token: res.token,
          }
        }))
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
          this.authService.steps.set(0)
        }, 1500)

      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
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
