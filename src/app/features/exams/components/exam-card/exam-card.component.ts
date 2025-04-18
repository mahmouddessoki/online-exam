import { Component, inject, input } from '@angular/core';
import { Exam } from '../../models/exam';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamInstModalComponent } from '../exam-inst-modal/exam-inst-modal.component';
import { ExamQModalsComponent } from '../exam-q-modals/exam-q-modals.component';
import { Store } from '@ngrx/store';
import { saveUserAnswers } from '../../../../store/actions/userAns.actions';
import { answers } from '../../../questions/models/question';

@Component({
  selector: 'app-exam-card',
  imports: [],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.scss'
})
export class ExamCardComponent {
  exam = input.required<Exam>()
  private modalService = inject(NgbModal);
  private store = inject(Store);
  selectedAns:answers={}
  openInstModal() {
    this.modalService.open(ExamInstModalComponent, {
      size: 'md',
      centered: true,
    }).result.then((res) => ({})
    , (reason) => {
      if (reason == "success") {
        const modalRef = this.modalService.open(ExamQModalsComponent, {
          size: 'lg',
          centered: true,
          backdrop:false
        })
        modalRef.componentInstance.examId = this.exam()._id
        modalRef.componentInstance.duration = this.exam().duration
        modalRef.result.then((res)=>{
          if(res=="closeQ") {
            this.store.dispatch(saveUserAnswers({
              user: {
                ...this.selectedAns
              }

            }))
          }
        })
      }
    })

  }

}
