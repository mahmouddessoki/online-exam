import { Component, input, InputSignal } from '@angular/core';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-quize-card',
  imports: [],
  templateUrl: './quize-card.component.html',
  styleUrl: './quize-card.component.scss'
})
export class QuizeCardComponent {
  subj: InputSignal<Subject> = input.required<Subject>();
}
