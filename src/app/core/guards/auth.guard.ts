import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const storageService = inject(StorageService)
  const res = storageService.getItem("examToken")
  let flag = false
  if (res !== "not a browser" && res) {
    router.navigate(['/dashboard'])
    flag = false;

  } else {
    flag = true;

  }
  return flag;
};
