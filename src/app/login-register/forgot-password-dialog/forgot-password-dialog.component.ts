import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forgot-password-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  template: `
        <h2 mat-dialog-title>Reset Password</h2>
        <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
            <mat-dialog-content>
                <mat-form-field appearance="outline">
                    <mat-label>Email</mat-label>
                    <input matInput formControlName="email" type="email" required>
                    <mat-error *ngIf="resetForm.get('email')?.hasError('required')">
                        Email is required
                    </mat-error>
                    <mat-error *ngIf="resetForm.get('email')?.hasError('email')">
                        Please enter a valid email
                    </mat-error>
                </mat-form-field>
            </mat-dialog-content>
            <mat-dialog-actions align="end">
                <button mat-button mat-dialog-close>Cancel</button>
                <button mat-raised-button color="primary" type="submit" [disabled]="resetForm.invalid">
                    Reset Password
                </button>
            </mat-dialog-actions>
        </form>
    `,
  styles: [`
        :host {
            display: block;
            padding: 20px;
            min-width: 350px;
        }

        mat-form-field {
            width: 100%;
        }

        mat-dialog-actions {
            margin-top: 20px;
        }
    `]
})
export class ForgotPasswordDialogComponent {
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.dialogRef.close(this.resetForm.value);
    }
  }
} 