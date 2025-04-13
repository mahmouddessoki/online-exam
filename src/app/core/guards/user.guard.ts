import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (typeof localStorage !== 'undefined') {
    if (!localStorage.getItem('examToken')) {
      router.navigate(['/login'])
      return false;

    }
  }
  return true;
};
