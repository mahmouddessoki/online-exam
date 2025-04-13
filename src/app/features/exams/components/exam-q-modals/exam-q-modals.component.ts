import { Component, inject, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../../../questions/services/questions.service';
import { Question } from '../../../questions/models/question';

@Component({
  selector: 'app-exam-q-modals',
  imports: [],
  templateUrl: './exam-q-modals.component.html',
  styleUrl: './exam-q-modals.component.scss'
})
export class ExamQModalsComponent implements OnInit {
  @Input({ required: true }) examId!: string;
  @Input({ required: true }) duration!: string;
  isChoosed:boolean = false;
  private readonly questionsService = inject(QuestionsService)
  questions: Question[] = [];
  currentQuestion: number = 1;
  totalQuestions!:number;
  ngOnInit(): void {
    console.log(this.examId);
    this.getQuestions()
  }


  getQuestions() {
    this.questionsService.getExamQuestions(this.examId).subscribe({
      next: (data) => {
        this.questions = data.questions;
        if (this.questions) {
          this.totalQuestions = this.questions.length
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }

  choosed() {
    this.isChoosed = !this.isChoosed
  }
}
