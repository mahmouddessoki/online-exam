import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  
  constructor(private http : HttpClient) { }

  getExams(id:string) : Observable<any> {
    return this.http.get(`${environment.API_URL}exams?subject=${id}`)
  }
}
