import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BASE_URL } from 'auth-api';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { authEffects } from './store/effects/auth.effects';
import { tokenAddInterceptor } from './core/interceptors/token-add.interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),
    withInterceptors([tokenAddInterceptor,loaderInterceptor])),
    { provide: BASE_URL, useValue: environment.API_URL },
    provideStore({
      auth: authReducer,
    }), provideEffects([authEffects]),
    importProvidersFrom(
      BrowserAnimationsModule,
      NgxSpinnerModule,
    )

  ]
};
