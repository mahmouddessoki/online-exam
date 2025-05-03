import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Subjects } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  getSubjects(limit?:number):Observable<Subjects> {
    let url = `${environment.API_URL}subjects`
    if(limit) {
      url +=`?limit = ${ limit }`
    }else {
      url = `${environment.API_URL}subjects?limit=6`
    }
    return this.http.get<Subjects>(url)
  }
}
