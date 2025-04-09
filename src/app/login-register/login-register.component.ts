import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginCredentials } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _route: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initiateLoginForm();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  initiateLoginForm() {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials: LoginCredentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (user) => {
          this.showSnackBar('Login successful');
          this._route.navigate(['/dashboard']);
        },
        error: (error) => {
          this.showSnackBar(error.message || 'Login failed', 'error');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  openSignupPage() {
    this._route.navigate(['/signup']);
  }

  openForgotPasswordDialog() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.resetPassword(result).subscribe({
          next: () => {
            this.showSnackBar('Password reset instructions sent to your email');
          },
          error: (error) => {
            this.showSnackBar(error.message || 'Failed to send reset instructions', 'error');
          }
        });
      }
    });
  }

  loginWithGoogle() {
    // Implement Google OAuth login
    this.showSnackBar('Google login coming soon');
  }

  loginWithFacebook() {
    // Implement Facebook OAuth login
    this.showSnackBar('Facebook login coming soon');
  }

  private showSnackBar(message: string, type: 'success' | 'error' = 'success'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}
