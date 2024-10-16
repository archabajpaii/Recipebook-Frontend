import { Component} from '@angular/core'; 
import { Router } from '@angular/router'; 
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;
  isLoggedIn: boolean = false;
  tokenKey: string = 'auth-token';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response: { token: string; }) => {
        localStorage.setItem('username', this.email);
        localStorage.setItem(this.tokenKey, response.token);
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        this.router.navigate(['/recipes']);
      },
      (error: any) => {
        this.snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    );
  }
}
