import { HttpInterceptorFn } from '@angular/common/http';

export const tokenAddInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('examToken');
    req = req.clone({
      setHeaders: {
        token: `${token}`
      }
    });
  }

  return next(req);
};
