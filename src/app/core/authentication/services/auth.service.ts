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
      localStorage.setItem('token', token);
    }
  }
  removeToken(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
  getUserEmail(): string | null {
    if (typeof localStorage) {
      return localStorage.getItem('userEmail');
    }
    return null;
  }
}
