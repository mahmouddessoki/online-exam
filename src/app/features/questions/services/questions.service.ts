import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

interface answersInterface {
  [questionId: string]: string | string[]
}





@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  selectedAnswers: WritableSignal<answersInterface> = signal<answersInterface>({});


  constructor(private http:HttpClient) { }
  getExamQuestions(examId:string):Observable<any>{
    return this.http.get(`${environment.API_URL}questions?exam=${examId}`)
  }
}
