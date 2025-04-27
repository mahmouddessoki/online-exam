import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { checkInterface, checkResponse } from '../models/check.interface';

interface answersInterface {
  [questionId: string]: string | string[]
}
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  selectedAnswers: WritableSignal<answersInterface> = signal<answersInterface>({});
  checkAnsRes: WritableSignal<checkResponse> = signal<checkResponse>({} as checkResponse);

  constructor(private http:HttpClient) { }
  getExamQuestions(examId:string):Observable<any>{
    return this.http.get(`${environment.API_URL}questions?exam=${examId}`)
  }


  checkAnswers(answersToCheck:checkInterface):Observable<any> {
    return this.http.post(`${environment.API_URL}questions/check`,answersToCheck)
  }


}
