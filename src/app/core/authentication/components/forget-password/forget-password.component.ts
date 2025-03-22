import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthApiService } from 'auth-api';
import { globalValidator } from '../../helpers/global-validators';
import { InputAlertDirective } from '../../directives/input-alert.directive';
import { ValidationMessagesComponent } from '../validation-messages/validation-messages.component';

@Component({
  selector: 'app-forget-password',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    InputAlertDirective
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
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
        setTimeout(() => {
          this.router.navigate(['/verify']);
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
  }

}
