import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SocialIconsComponent } from "./components/social-icons/social-icons.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NavbarComponent, SocialIconsComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
