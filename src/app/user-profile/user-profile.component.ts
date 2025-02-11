import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatToolbarModule, MatInputModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userForm!: FormGroup
  constructor(private _fb: FormBuilder, private http: HttpClient) { }
  ngOnInit() {
    this.userForm = this._fb.group(
      {
        profile_picture: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    )
    this.getUserData()
  }
  getUserData() {
    // Fetch user data from the API
    // this.http.get('http://localhost:3000/api/v1/user').subscribe((data: any) => {
    //   this.userForm.patchValue(data);
    // });
    this.userForm.patchValue({
      profile_picture: 'https://randomuser.me/api/portraits',
      username: 'John Doe',
      email: 'lavaraju@gmail.com',
      password: 'password'
    })
  }

  updateUser() {
    // Update user data
    this.http.put('http://localhost:3000/api/v1/user', this.userForm.value).subscribe((data: any) => {
      console.log('User updated successfully');
    });
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userForm.patchValue({ profile_picture: reader.result as string });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

}
