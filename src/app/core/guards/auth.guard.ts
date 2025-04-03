import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('token')) {
      router.navigate(['/home'])
      return false;

    }
  }
  return true;
};
