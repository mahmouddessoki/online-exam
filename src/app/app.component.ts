import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { saveUserData } from './store/actions/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'exam';
  private readonly store = inject(Store)
  ngOnInit(): void {
    this.saveData()
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
