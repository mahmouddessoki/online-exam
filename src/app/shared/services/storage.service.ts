import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly pid = inject(PLATFORM_ID)
  constructor() {
  }

  setItem(key: string, value: string) {
    if (isPlatformBrowser(this.pid)) {
      localStorage.setItem(key, value)
    }
  }
  getItem(key: string): string | null | "not browser" {
    if (isPlatformBrowser(this.pid)) {
      return localStorage.getItem(key)
    }
    return "not browser"
  }
}
