import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const storageService = inject(StorageService)
  const res = storageService.getItem("examToken")
  if (!res) {
    router.navigate(['/login'])
    return false;
  }
  return true;
};
