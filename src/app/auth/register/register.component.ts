import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordComplexityValidator,
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  passwordComplexityValidator(control: any) {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinimumLength = password?.length >= 8;

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasMinimumLength) {
      return { passwordComplexity: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;
    this.authService.register(email, password).subscribe({
      next: (response: any) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/login']);
      },
      error: (err: { error: { message: string } }) => {
        this.error =
          err.error.message || 'Registration failed. Please try again.';
      },
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}
