import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { saveUserData } from './store/actions/auth.actions';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'exam';
  private readonly store = inject(Store)
  constructor(private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.saveData()
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
  saveData() {
    if (typeof localStorage !== 'undefined')
      this.store.dispatch(saveUserData({
        user: {
          token: localStorage.getItem('token') || null
        }
      }));
  }


}
