import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionsService } from '../../../questions/services/questions.service';

@Component({
  selector: 'app-result-chart-modal',
  imports: [NgxChartsModule],
  templateUrl: './result-chart-modal.component.html',
  styleUrl: './result-chart-modal.component.scss'
})
export class ResultChartModalComponent {
  private readonly ngbModal = inject(NgbActiveModal)
  private readonly qService = inject(QuestionsService)
  // private readonly ngModal = inject(ngb)
  @Input() correctAns!: number;
  @Input() inCorrectAns!: number;
  data:{name:string,value:number}[]=[];
  percentage!:number;
  customColors = [
    {
      name: 'Correct',
      value: '#02369C'
    },
    {
      name: 'Incorrect',
      value: '#CC1010'
    }
  ];
  ngOnInit(){

    this.data = [
      { name: 'Correct', value: this.correctAns },
      { name: 'Incorrect', value: this.inCorrectAns }
    ];
    this.percentage = Math.round((this.correctAns / (this.correctAns + this.inCorrectAns)) * 100);

  }

  closeModal() {
    this.ngbModal.close("closeModal")
  }
  showResults(){
    this.ngbModal.dismiss("summary")
  }





}
