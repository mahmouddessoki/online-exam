import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  steps: WritableSignal<number> = signal<number>(0)

  constructor() { }


  saveUserEmail(email: string) {
    if (typeof localStorage) {
      localStorage.setItem('userEmail', email);
    }
  }
  saveUserToken(token: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('examToken', token);
    }
  }
  removeToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('examToken');
    }
  }
  getUserEmail(): string | null {
    if (typeof localStorage) {
      return localStorage.getItem('userEmail');
    }
    return null;
  }
}
