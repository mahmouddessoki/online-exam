import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exam-inst-modal',
  imports: [],
  templateUrl: './exam-inst-modal.component.html',
  styleUrl: './exam-inst-modal.component.scss'
})
export class ExamInstModalComponent {

  activeModal = inject(NgbActiveModal);

  startExam(){
    this.activeModal.dismiss('success');
  }
}
