import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamsService } from '../../services/exams.service';
import { ExamCardComponent } from "../exam-card/exam-card.component";
import { Exam } from '../../models/exam';

@Component({
  selector: 'app-exam-list',
  imports: [ExamCardComponent],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.scss'
})
export class ExamListComponent {

  private readonly activeRoute = inject(ActivatedRoute)
  private readonly examService = inject(ExamsService)
  subjId!:string;
  subjName!:string;
  exams:Exam[] = []

  ngOnInit(): void {
    this.getSubjId()
  }

  getSubjId(){
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        this.subjId = params.get('id')!
        this.subjName = params.get('name')!
        this.getSubjectExams()
      },
    })
  }

  getSubjectExams(){
    this.examService.getExams(this.subjId).subscribe({
      next: (res) => {
        this.exams=res.exams;
      },
      error: (err) => {
      }
    })
  }

}
