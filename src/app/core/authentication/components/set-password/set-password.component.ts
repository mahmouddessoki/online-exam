import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { globalValidator } from '../../helpers/global-validators';
import { passwordMisMatch } from '../../helpers/password-match';
import { InputAlertDirective } from '../../directives/input-alert.directive';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

@Component({
  selector: 'app-set-password',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective
  ],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authApiService = inject(AuthApiService)
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
      email: this.authForm.get('email')?.value,
      newPassword: this.authForm.get('password')?.value,
    };
    this.subscription = this.authApiService.setPassword(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.resMsg = res.message;
        this.authApiService.saveToken(res.token)
        setTimeout(() => {
          this.router.navigate(['/home']);
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
