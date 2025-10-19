import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'dessoki-auth-api';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { InputAlertDirective } from '../../directives/input-alert.directive';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { FormBtnComponent } from "../../../layouts/auth-layout/components/form-btn/form-btn.component";
import { ResponseMsgComponent } from "../../../layouts/auth-layout/components/response-msg/response-msg.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-code',
  imports: [
    ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective,
    FormBtnComponent,
    ResponseMsgComponent
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authApiService = inject(AuthApiService)
  private readonly authService = inject(AuthService)

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
      resetCode: [null, Validators.required],
    });
  }


  verifyCode() {
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    let data = this.authForm.value;
    this.subscription = this.authApiService.verifyCode(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.resMsg = res.status;
        setTimeout(() => {
          this.authService.steps.set(2);
        }, 1500)
      },
      error: (err) => {
        this.isLoading = false;
        this.resMsg = err.error.message;

      }
    })

  }
  resendCode() {
    const data = { email: this.authService.getUserEmail()! }
    this.subscription = this.authApiService.forgetPass(data).subscribe({
      next: (res) => {
        this.resMsg = "Code Resent Successfully";
        setTimeout(() => {
          this.authService.steps.set(1)
        }, 1500)
      },
      error: (err) => {
        this.resMsg = err.error.message;

      }
    })
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
