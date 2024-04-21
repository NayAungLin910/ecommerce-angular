import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit = (): void => {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', {
        duration: 5000,
        panelClass: 'error-snackbar',
      });
      return;
    }

    this.authService.register(this.signupForm.value).subscribe({
      next: () => {
        this.snackBar.open('Sign up successful!', 'Close', {
          duration: 5000,
        });
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.snackBar.open('Sign up failed. Please try again!', 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar',
        });
        return;
      }
    });
  };

}
