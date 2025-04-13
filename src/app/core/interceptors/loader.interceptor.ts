import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinner = inject(NgxSpinnerService)
  if(req.url.includes('subjects')) {
    ngxSpinner.show();
  }
  return next(req).pipe(finalize(()=>{
    ngxSpinner.hide();
  }));
};
