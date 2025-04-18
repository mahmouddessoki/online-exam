import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveUserAnswers } from '../../../../store/actions/userAns.actions';
import { answers, Question } from '../../models/question';

@Component({
  selector: 'app-question-card',
  imports: [],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent {
  private readonly store = inject(Store)
  @Input({ required: true }) question: Question = {} as Question;
  selectedAnswers: answers = {};

  choosed() {
  }
  ngOnInit(){
    console.log(this.store);
  }

  onAnswerChange(e: Event, q: Question) {
    const inp = e.target as HTMLInputElement;
    const isChecked = inp.checked
    const val = inp.value

    if (this.question.type == 'single_choice') {
      this.selectedAnswers[this.question._id] = val
    } else {
      if (!this.selectedAnswers[this.question._id]) {
        this.selectedAnswers[this.question._id] = [];
      }
      const currentAnswers = this.selectedAnswers[this.question._id] as string[];

      if (isChecked) {
        currentAnswers.push(inp.value);
      } else {
        this.selectedAnswers[this.question._id] = currentAnswers.filter(v => v !== inp.value);
      }
    }

    this.store.dispatch(saveUserAnswers({
      user: {
        ...this.selectedAnswers
      }
    }))



  }


}

