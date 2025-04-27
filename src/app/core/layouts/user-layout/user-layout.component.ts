import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet,RouterLinkActive,RouterLink],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent implements AfterViewInit {

  private readonly platformId = inject(PLATFORM_ID)
  private readonly router = inject(Router)
  @ViewChild("collapse") collapsed!:ElementRef

  logout(){
    if(isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("examToken")
      this.router.navigate(['/login']);
    }
  }


  ngAfterViewInit(): void {
    
  }

  hideNav(){
    this.collapsed.nativeElement.classList.remove("show")
  }



}
