import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet,RouterLinkActive,RouterLink],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

  private readonly platformId = inject(PLATFORM_ID)
  private readonly router = inject(Router)

  logout(){
    if(isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("examToken")
      this.router.navigate(['/login']);
    }
  }


}
