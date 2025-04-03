import { Component, input } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-form-btn',
  imports: [LoaderComponent],
  templateUrl: './form-btn.component.html',
  styleUrl: './form-btn.component.scss'
})
export class FormBtnComponent {
  isLoading = input.required<boolean>()
  isValid = input.required<boolean>()
  btnText = input.required<string>()
}
