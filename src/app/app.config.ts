import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BASE_URL } from 'auth-api';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withHashLocation()),
     provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: BASE_URL, useValue: environment.API_URL }
    ]
};
