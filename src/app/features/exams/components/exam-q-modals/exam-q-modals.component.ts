import { Component, inject, Input, NgModule, OnInit, signal, WritableSignal } from '@angular/core';
import { QuestionsService } from '../../../questions/services/questions.service';
import { answers, Question } from '../../../questions/models/question';
import { QuestionCardComponent } from "../../../questions/components/question-card/question-card.component";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { answersSelector } from '../../../../store/selectors/answers.selector';
import { ResultChartModalComponent } from '../../../results/component/result-chart-modal/result-chart-modal.component';

@Component({
  selector: 'app-exam-q-modals',
  imports: [QuestionCardComponent],
  templateUrl: './exam-q-modals.component.html',
  styleUrl: './exam-q-modals.component.scss'
})
export class ExamQModalsComponent implements OnInit {
  private readonly ngbModal = inject(NgbActiveModal)
  private modalService = inject(NgbModal);
  private readonly store = inject(Store)
  @Input({ required: true }) examId!: string;
  @Input({ required: true }) duration!: string;
  isChoosed: boolean = false;
  private readonly questionsService = inject(QuestionsService)
  questions: Question[] = [];
  questionsCopy: Question[] = [];
  currentQuestion: WritableSignal<number> = signal<number>(0);
  totalQuestions!: number;
  selectedAnswers: answers = {}
  correctAns: number = 0;
  wrongAnswers: number = 0
  ngOnInit(): void {
    this.getQuestions()

  }

  getSelectedAns() {
    this.store.select(answersSelector).subscribe({
      next: (ans) => {
        this.selectedAnswers = ans
      }
    })
  }


  getQuestionsCopy() {
    this.questionsCopy = structuredClone(this.questions)
  }

  getQuestions() {
    this.questionsService.getExamQuestions(this.examId).subscribe({
      next: (data) => {
        this.questions = data.questions;
        if (this.questions) {
          this.totalQuestions = this.questions.length
          this.getQuestionsCopy()
        }
        this.getSelectedAns()
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }

  choosed() {
    this.isChoosed = !this.isChoosed
  }
  getNext() {
    if (this.currentQuestion() < this.totalQuestions - 1) {
      this.currentQuestion.update((val) => val + 1);
    } else {
      if (this.currentQuestion() == this.totalQuestions - 1) {
        this.correctAns = 0;
        this.wrongAnswers = 0;
        for (const q of this.questionsCopy) {
          if (q.correct == this.selectedAnswers[q._id]) {
            this.correctAns += 1
          } else {
            this.wrongAnswers += 1
          }

        }
        this.ngbModal.close("closeQ")

        const modalRef = this.modalService.open(ResultChartModalComponent, {
          size: 'lg',
          centered: true,
          backdrop: true
        })
        modalRef.componentInstance.correctAns = this.correctAns
        modalRef.componentInstance.inCorrectAns = this.wrongAnswers


      }
    }

  }
  getPrev() {
    if (this.currentQuestion() > 0) {
      this.currentQuestion.update((val) => val - 1);
    } else {
      this.ngbModal.close("closeQ")
    }
  }

  isEmptyObj(obj: answers) {
    if (Object.keys(obj).length > 0) {
      return false
    }
    return true
  }
}
