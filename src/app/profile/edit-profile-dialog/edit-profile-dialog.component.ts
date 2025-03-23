import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { User } from '../../../services/auth.service';
import { AvatarUploadDialogComponent } from '../avatar-upload-dialog/avatar-upload-dialog.component';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EditProfileDialogComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      profile_picture: ['']
    });
  }

  ngOnInit() {
    // Initialize form with current user data
    if (this.data) {
      this.profileForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value);
    }
  }

  openAvatarUploadDialog() {
    const dialogRef = this.dialog.open(AvatarUploadDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profileForm.patchValue({
          profile_picture: result
        });
      }
    });
  }
} 