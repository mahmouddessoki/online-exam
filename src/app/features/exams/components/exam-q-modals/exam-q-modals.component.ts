import { Component, inject, Input, NgModule, OnInit, signal, WritableSignal } from '@angular/core';
import { QuestionsService } from '../../../questions/services/questions.service';
import { answers, Question } from '../../../questions/models/question';
import { QuestionCardComponent } from "../../../questions/components/question-card/question-card.component";
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { answersSelector } from '../../../../store/selectors/answers.selector';
import { ResultChartModalComponent } from '../../../results/component/result-chart-modal/result-chart-modal.component';
import { Subscription } from 'rxjs';
import { AnswerInterface, checkInterface } from '../../../questions/models/check.interface';
import { SummaryInterface } from '../../models/summary-interface';
import { SummaryComponent } from '../summary/summary.component';
import { CountdownComponent } from "../../../../shared/components/ui/countdown/countdown.component";


@Component({
  selector: 'app-exam-q-modals',
  imports: [QuestionCardComponent, CountdownComponent],
  templateUrl: './exam-q-modals.component.html',
  styleUrl: './exam-q-modals.component.scss'
})
export class ExamQModalsComponent implements OnInit {
  private readonly ngbModal = inject(NgbActiveModal)
  private modalService = inject(NgbModal);
  private readonly store = inject(Store)
  private readonly questionsService = inject(QuestionsService)
  @Input({ required: true }) examId!: string;
  @Input({ required: true }) duration!: number;
  isChoosed: boolean = false;
  questions: Question[] = [];
  questionsCopy: Question[] = [];
  currentQuestion: WritableSignal<number> = signal<number>(0);
  totalQuestions!: number;
  selectedAnswers: answers = {}
  correctAns: number = 0;
  wrongAnswers: number = 0;
  subscription: Subscription = new Subscription();
  answersCheck: checkInterface = {} as checkInterface;
  answers: AnswerInterface[] = [];
  summary: SummaryInterface[] = [];

  ngOnInit(): void {
    this.getQuestions()

  }

  getSelectedAns() {
    this.store.select(answersSelector).subscribe({
      next: (ans) => {
        this.selectedAnswers = ans
        console.log(this.selectedAnswers);
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
        this.formCheckAns()
        this.ngbModal.close("closeQ")

        const modalRef = this.modalService.open(ResultChartModalComponent, {
          size: 'lg',
          centered: true,
          backdrop: true
        })
        modalRef.componentInstance.correctAns = this.correctAns
        modalRef.componentInstance.inCorrectAns = this.wrongAnswers
        modalRef.result.then((res) => {
          console.log("first", res);
        }, (r) => {
          if (r == "summary") {
            const modalReference = this.modalService.open(SummaryComponent, {
              size: 'lg',
              centered: true,
              backdrop: true
            })
            modalReference.componentInstance.summary = this.summary
          }
        })
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

  formCheckAns() {
    let i = 0
    for (const key of Object.keys(this.selectedAnswers)) {
      this.answers[i] = {
        questionId: key,
        correct: this.selectedAnswers[key] as string
      }
      i++;
    }

    this.checkAnswers()
  }

  checkAnswers() {
    for (let i = 0; i < this.questionsCopy.length; i++) {
      const q = this.questionsCopy[i];
      if (q._id == this.answers[i].questionId) {
        this.summary[i] = {
          choice: this.answers[i].correct,
          question: q
        }
      }

    }

  }
  isAnswered(){
    let flag = false
    for (const answer of Object.keys(this.selectedAnswers)) {
      if(answer == this.questions[this.currentQuestion()]._id) {
        flag = true
        break;
      }
    }
    return flag;

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
