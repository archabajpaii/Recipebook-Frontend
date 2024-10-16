import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service'; // Adjust the path if necessary

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout(); // Log the user out
  }
}
