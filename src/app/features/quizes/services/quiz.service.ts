import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  getSubjects(limit:number=6):Observable<any> {
    return this.http.get(`${environment.API_URL}subjects?limit=${limit}`)
  }
}
