import { Component } from '@angular/core';
import { QuizListComponent } from "../../../quizes/components/quiz-list/quiz-list.component";

@Component({
  selector: 'app-dashboard',
  imports: [QuizListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {



}
