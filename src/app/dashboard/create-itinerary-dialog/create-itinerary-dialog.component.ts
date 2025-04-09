import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-itinerary-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Create New Itinerary</h2>
    <form [formGroup]="itineraryForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title" placeholder="Enter itinerary title">
            <mat-error *ngIf="itineraryForm.get('title')?.hasError('required')">
              Title is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="3" placeholder="Enter itinerary description"></textarea>
            <mat-error *ngIf="itineraryForm.get('description')?.hasError('required')">
              Description is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Start Date</mat-label>
            <input matInput [matDatepicker]="startPicker" formControlName="startDate">
            <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
            <mat-datepicker #startPicker></mat-datepicker>
            <mat-error *ngIf="itineraryForm.get('startDate')?.hasError('required')">
              Start date is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>End Date</mat-label>
            <input matInput [matDatepicker]="endPicker" formControlName="endDate">
            <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
            <mat-datepicker #endPicker></mat-datepicker>
            <mat-error *ngIf="itineraryForm.get('endDate')?.hasError('required')">
              End date is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Visibility</mat-label>
            <mat-select formControlName="visibility">
              <mat-option value="private">Private</mat-option>
              <mat-option value="shared">Shared with Friends</mat-option>
              <mat-option value="public">Public</mat-option>
            </mat-select>
            <mat-error *ngIf="itineraryForm.get('visibility')?.hasError('required')">
              Visibility is required
            </mat-error>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!itineraryForm.valid">
          Create Itinerary
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    :host {
      display: block;
      padding: 24px;
      max-width: 500px;
    }

    h2 {
      margin: 0 0 24px;
      color: #333;
    }

    .form-row {
      margin-bottom: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    mat-dialog-actions {
      margin-top: 24px;
    }
  `]
})
export class CreateItineraryDialogComponent {
  itineraryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateItineraryDialogComponent>
  ) {
    this.itineraryForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      visibility: ['private', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.itineraryForm.valid) {
      this.dialogRef.close(this.itineraryForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
} 