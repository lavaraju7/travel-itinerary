import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ],
    template: `
        <div class="login-container">
            <mat-card>
                <mat-card-header>
                    <mat-card-title>Login</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                        <mat-form-field appearance="outline">
                            <mat-label>Email</mat-label>
                            <input matInput formControlName="email" type="email" required>
                            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                                Email is required
                            </mat-error>
                            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                                Please enter a valid email
                            </mat-error>
                        </mat-form-field>

                        <mat-form-field appearance="outline">
                            <mat-label>Password</mat-label>
                            <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" required>
                            <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                            </button>
                            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                                Password is required
                            </mat-error>
                        </mat-form-field>

                        <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || isLoading">
                            <mat-icon>login</mat-icon>
                            Login
                        </button>
                    </form>

                    <div class="signup-link">
                        <p>Don't have an account? <a routerLink="/signup">Sign up</a></p>
                    </div>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [`
        .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f5f5f5;
        }

        mat-card {
            width: 100%;
            max-width: 400px;
            padding: 20px;
        }

        mat-card-header {
            justify-content: center;
            margin-bottom: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        mat-form-field {
            width: 100%;
        }

        button[type="submit"] {
            width: 100%;
            height: 48px;
        }

        .signup-link {
            text-align: center;
            margin-top: 16px;
        }

        a {
            color: #1976d2;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    `]
})
export class LoginComponent {
    loginForm: FormGroup;
    hidePassword = true;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            const { email, password } = this.loginForm.value;

            this.authService.login(email, password).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    this.snackBar.open(error.message || 'Login failed', 'Close', {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
                },
                complete: () => {
                    this.isLoading = false;
                }
            });
        }
    }
} 