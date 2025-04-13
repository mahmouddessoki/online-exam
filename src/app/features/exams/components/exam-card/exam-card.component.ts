import { Component, inject, input } from '@angular/core';
import { Exam } from '../../models/exam';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamInstModalComponent } from '../exam-inst-modal/exam-inst-modal.component';
import { ExamQModalsComponent } from '../exam-q-modals/exam-q-modals.component';

@Component({
  selector: 'app-exam-card',
  imports: [],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.scss'
})
export class ExamCardComponent {
  exam = input.required<Exam>()
  private modalService = inject(NgbModal);
  openInstModal() {
    this.modalService.open(ExamInstModalComponent, {
      size: 'md',
      centered: true,
    }).result.then((res) => {
      console.log(res);
    }, (reason) => {
      if (reason == "success") {
        const modalRef = this.modalService.open(ExamQModalsComponent, {
          size: 'lg',
          centered: true,
          backdrop:true
        })
        modalRef.componentInstance.examId = this.exam()._id
        modalRef.componentInstance.duration = this.exam().duration
      }
    })

  }

}
