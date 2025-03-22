import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from 'auth-api';
import { Subscription } from 'rxjs';
import { InputAlertDirective } from '../../directives/input-alert.directive';
import { globalValidator } from '../../helpers/global-validators';
import { passwordMisMatch } from '../../helpers/password-match';
import { ValidationMessagesComponent } from "../validation-messages/validation-messages.component";
@Component({
  selector: 'app-register',
  imports: [RouterLink,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
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
      username: [''],
      firstName: [null, globalValidator.nameValidate],
      lastName: [null, globalValidator.nameValidate],
      email: [null, globalValidator.emailValidate],
      phone: [null, globalValidator.phoneValidate],
      password: [null, globalValidator.passwordValidate],
      rePassword: [null],
    }, { validators: passwordMisMatch });
  }
  updateUsername(): void {
    const firstName = this.authForm.get('firstName')?.value;
    const lastName = this.authForm.get('lastName')?.value;

    // Concatenate firstName and lastName for the username
    this.authForm.get('username')?.setValue(`${firstName} ${lastName}`.trim());
  }

  register() {

    if (this.authForm.invalid || this.isLoading) {
      this.authForm.markAllAsTouched();
      this.authForm.get('password')?.setValue('');
      return;
    }
    this.updateUsername();
    this.isLoading = true;
    let data = this.authForm.value;
    this.subscription = this.authApiService.register(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.resMsg = res.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
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
