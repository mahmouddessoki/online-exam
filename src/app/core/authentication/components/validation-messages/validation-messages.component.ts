import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'validation-messages',
  imports: [],
  templateUrl: './validation-messages.component.html',
  styleUrl: './validation-messages.component.scss'
})
export class ValidationMessagesComponent {
  @Input() control!: AbstractControl | null;

}
