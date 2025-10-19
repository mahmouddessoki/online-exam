import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const storageService = inject(StorageService)
  const res = storageService.getItem("examToken")
  if (res !== "not browser" && res) {
    router.navigate(['/dashboard'])
    return false
  }
  return true;
};
