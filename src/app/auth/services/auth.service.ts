import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NonNullAssert } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';
  private baseUrl = 'http://localhost:5005/api/auth/';
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`http://localhost:5005/api/auth/login`, {
      email,
      password,
    });
  }

  register(email: string, password: string) {
    return this.http.post<any>('http://localhost:5005/api/auth/register', {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
    this.snackBar.open('Logged out successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  isTokenExpired(tokenKey: string): boolean {
    const expiry = JSON.parse(atob(tokenKey.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return false;
    }
    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }
}
