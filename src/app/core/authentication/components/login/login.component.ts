import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'auth-api';
import { Subscription } from 'rxjs';
import { InputAlertDirective } from '../../directives/input-alert.directive';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';
import { globalValidator } from '../../helpers/global-validators';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
        this.authApiService.saveToken(res.token)
        setTimeout(() => {
          this.router.navigate(['/home']);
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
