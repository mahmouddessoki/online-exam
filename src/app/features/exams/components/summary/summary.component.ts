import { Component, inject, Input } from '@angular/core';
import { SummaryInterface } from '../../models/summary-interface';
import { QuestionCardComponent } from "../../../questions/components/question-card/question-card.component";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-summary',
  imports: [QuestionCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  private readonly ngbModal = inject(NgbActiveModal)
  @Input() summary: SummaryInterface[] = [];

  closeModal() {
    this.ngbModal.close();
  }
}
