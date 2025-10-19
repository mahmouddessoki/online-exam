import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthApiService } from 'dessoki-auth-api';
import { Subscription } from 'rxjs';
import { FormBtnComponent } from "../../../layouts/auth-layout/components/form-btn/form-btn.component";
import { ResponseMsgComponent } from "../../../layouts/auth-layout/components/response-msg/response-msg.component";
import { InputAlertDirective } from '../../directives/input-alert.directive';
import { globalValidator } from '../../helpers/global-validators';
import { AuthService } from '../../services/auth.service';
import { SetPasswordComponent } from "../set-password/set-password.component";
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { VerifyCodeComponent } from "../verify-code/verify-code.component";

@Component({
  selector: 'app-forget-password',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective,
    FormBtnComponent,
    ResponseMsgComponent,
    VerifyCodeComponent,
    SetPasswordComponent
],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authApiService = inject(AuthApiService)
  private readonly authService = inject(AuthService)
  steps = computed(()=>this.authService.steps())
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
      email: [null, globalValidator.emailValidate]
    });
  }


  getCode() {
    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    let data = this.authForm.value;
    this.subscription = this.authApiService.forgetPass(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.resMsg = res.message;
        this.authService.saveUserEmail(this.authForm.value.email)
        setTimeout(() => {
         this.authService.steps.set(1)
        },1500)
      },
      error: (err) => {
        this.isLoading = false;
        this.resMsg = err.error.message;

      }
    })

  }



  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.authService.steps.set(0);
  }

}
