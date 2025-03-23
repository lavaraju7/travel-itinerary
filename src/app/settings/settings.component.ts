import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../services/auth.service';

interface UserSettings {
  email: string;
  username: string;
  language: string;
  timezone: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    tripReminders: boolean;
    expenseAlerts: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showLocation: boolean;
    showExpenses: boolean;
  };
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule
  ],
  template: `
    <div class="page-container">
      <h1 class="section-title">Settings</h1>

      <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
        <!-- Account Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Account Settings</mat-card-title>
            <mat-icon>account_circle</mat-icon>
          </mat-card-header>
          <mat-card-content>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Username</mat-label>
                <input matInput formControlName="username" required>
                <mat-error *ngIf="settingsForm.get('username')?.hasError('required')">
                  Username is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" required type="email">
                <mat-error *ngIf="settingsForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="settingsForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Language</mat-label>
                <mat-select formControlName="language">
                  <mat-option value="en">English</mat-option>
                  <mat-option value="es">Spanish</mat-option>
                  <mat-option value="fr">French</mat-option>
                  <mat-option value="de">German</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Timezone</mat-label>
                <mat-select formControlName="timezone">
                  <mat-option value="UTC">UTC</mat-option>
                  <mat-option value="EST">Eastern Time</mat-option>
                  <mat-option value="PST">Pacific Time</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Currency</mat-label>
                <mat-select formControlName="currency">
                  <mat-option value="USD">USD ($)</mat-option>
                  <mat-option value="EUR">EUR (€)</mat-option>
                  <mat-option value="GBP">GBP (£)</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Notification Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Notification Settings</mat-card-title>
            <mat-icon>notifications</mat-icon>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-group">
              <div class="setting-item">
                <div class="setting-info">
                  <h3>Email Notifications</h3>
                  <p>Receive updates via email</p>
                </div>
                <mat-slide-toggle formControlName="emailNotifications"></mat-slide-toggle>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Push Notifications</h3>
                  <p>Receive updates on your device</p>
                </div>
                <mat-slide-toggle formControlName="pushNotifications"></mat-slide-toggle>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Trip Reminders</h3>
                  <p>Get reminded about upcoming trips</p>
                </div>
                <mat-slide-toggle formControlName="tripReminders"></mat-slide-toggle>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Expense Alerts</h3>
                  <p>Get notified about shared expenses</p>
                </div>
                <mat-slide-toggle formControlName="expenseAlerts"></mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Privacy Settings -->
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Privacy Settings</mat-card-title>
            <mat-icon>security</mat-icon>
          </mat-card-header>
          <mat-card-content>
            <div class="settings-group">
              <div class="setting-item">
                <div class="setting-info">
                  <h3>Profile Visibility</h3>
                  <p>Control who can see your profile</p>
                </div>
                <mat-form-field appearance="outline">
                  <mat-select formControlName="profileVisibility">
                    <mat-option value="public">Public</mat-option>
                    <mat-option value="private">Private</mat-option>
                    <mat-option value="friends">Friends Only</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Show Location</h3>
                  <p>Allow others to see your current location</p>
                </div>
                <mat-slide-toggle formControlName="showLocation"></mat-slide-toggle>
              </div>

              <div class="setting-item">
                <div class="setting-info">
                  <h3>Show Expenses</h3>
                  <p>Allow others to see your expenses</p>
                </div>
                <mat-slide-toggle formControlName="showExpenses"></mat-slide-toggle>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="form-actions">
          <button mat-button type="button" (click)="resetForm()">Reset</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!settingsForm.valid">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    @import '../../styles/shared.scss';

    .page-container {
      padding: $spacing-lg;
      max-width: 800px;
      margin: 0 auto;
    }

    .section-title {
      @include heading-1;
      margin-bottom: $spacing-xl;
    }

    .settings-card {
      @include card;
      margin-bottom: $spacing-lg;

      mat-card-header {
        padding: $spacing-md;
        border-bottom: 1px solid $color-border;
        margin-bottom: 0;

        mat-card-title {
          @include heading-3;
          margin: 0;
        }

        mat-icon {
          margin-left: $spacing-sm;
          color: $color-primary;
        }
      }

      mat-card-content {
        padding: $spacing-lg;
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: $spacing-md;
      margin-bottom: $spacing-md;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .settings-group {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacing-sm 0;

      .setting-info {
        h3 {
          @include heading-4;
          margin: 0 0 $spacing-xs;
        }

        p {
          @include body-text;
          color: $color-text-secondary;
          margin: 0;
        }
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: $spacing-md;
      margin-top: $spacing-xl;
    }

    mat-form-field {
      width: 100%;
    }
  `]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currentSettings: UserSettings = {
    email: '',
    username: '',
    language: 'en',
    timezone: 'UTC',
    currency: 'USD',
    notifications: {
      email: true,
      push: true,
      tripReminders: true,
      expenseAlerts: true
    },
    privacy: {
      profileVisibility: 'public',
      showLocation: false,
      showExpenses: true
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.settingsForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      language: ['en'],
      timezone: ['UTC'],
      currency: ['USD'],
      emailNotifications: [true],
      pushNotifications: [true],
      tripReminders: [true],
      expenseAlerts: [true],
      profileVisibility: ['public'],
      showLocation: [false],
      showExpenses: [true]
    });
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    // TODO: Load settings from API
    this.currentSettings = {
      email: 'user@example.com',
      username: 'username',
      language: 'en',
      timezone: 'UTC',
      currency: 'USD',
      notifications: {
        email: true,
        push: true,
        tripReminders: true,
        expenseAlerts: true
      },
      privacy: {
        profileVisibility: 'public',
        showLocation: false,
        showExpenses: true
      }
    };

    this.settingsForm.patchValue({
      ...this.currentSettings,
      ...this.currentSettings.notifications,
      ...this.currentSettings.privacy
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      const formValue = this.settingsForm.value;
      const settings: UserSettings = {
        email: formValue.email,
        username: formValue.username,
        language: formValue.language,
        timezone: formValue.timezone,
        currency: formValue.currency,
        notifications: {
          email: formValue.emailNotifications,
          push: formValue.pushNotifications,
          tripReminders: formValue.tripReminders,
          expenseAlerts: formValue.expenseAlerts
        },
        privacy: {
          profileVisibility: formValue.profileVisibility,
          showLocation: formValue.showLocation,
          showExpenses: formValue.showExpenses
        }
      };

      // TODO: Save settings to API
      console.log('Saving settings:', settings);
      this.showSnackBar('Settings saved successfully');
    }
  }

  resetForm(): void {
    this.loadSettings();
    this.showSnackBar('Settings reset to default values');
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
