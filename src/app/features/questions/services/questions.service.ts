import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { checkInterface, checkResponse } from '../models/check.interface';
import { examQ } from '../models/question';

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
  getExamQuestions(examId:string):Observable<examQ>{
    return this.http.get<examQ>(`${environment.API_URL}questions?exam=${examId}`)
  }





}
