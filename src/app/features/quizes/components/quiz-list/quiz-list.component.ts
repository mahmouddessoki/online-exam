import { Component, inject } from '@angular/core';
import { QuizeCardComponent } from "../quize-card/quize-card.component";
import { Subscription } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { Subject } from '../../../quizes/models/subject';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  imports: [QuizeCardComponent,RouterLink],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent {
  private quizService = inject(QuizService)
  subscription = new Subscription()
  subjects: Subject[] = [];
  numOfPages!: number;
  placeholders:number[]=[1,2,3,4,5,6]

  ngOnInit(): void {
    this.getSubjects()
  }
  getSubjects(limit?:number) {
    this.subscription = this.quizService.getSubjects(limit).subscribe({
      next: (data) => {
        this.subjects = data.subjects
        this.numOfPages = data.metadata.numberOfPages
        console.log(data);
      },
      error: (error) => {
      }
    })

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getAll(){
    this.getSubjects(this.numOfPages*6)
  }
}
