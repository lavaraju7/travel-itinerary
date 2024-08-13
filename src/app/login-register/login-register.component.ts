import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss'
})
export class LoginRegisterComponent implements OnInit, OnDestroy{
  loginForm!:FormGroup
  constructor(private _fb:FormBuilder){

  }

  ngOnInit(): void {
    //* create login form
    this.initiateLoginForm()
  }

  ngOnDestroy(): void {
    
  }

  initiateLoginForm(){
    this.loginForm = this._fb.group(
      {
        username:['',[Validators.required]],
        password:['',[Validators.required]]
      }
    )
  }
  
}
