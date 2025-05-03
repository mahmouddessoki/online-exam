import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenAddInterceptor: HttpInterceptorFn = (req, next) => {
  const pid = inject(PLATFORM_ID)
  if (isPlatformBrowser(pid)) {
    const token = localStorage.getItem('examToken');
    if (token) {
      req = req.clone({
        setHeaders: {
          token: `${token}`
        }
      });
    }
  }

  return next(req);
};
