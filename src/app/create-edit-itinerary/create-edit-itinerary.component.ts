import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-itinerary',
  standalone: true,
  imports: [MatIconModule,MatCardModule,MatFormFieldModule,MatToolbarModule,MatButtonModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './create-edit-itinerary.component.html',
  styleUrl: './create-edit-itinerary.component.scss'
})
export class CreateEditItineraryComponent implements OnInit{

  itineraryForm!:FormGroup
  constructor(private _fb:FormBuilder){

  }
  ngOnInit(): void {
    this.itineraryForm = this._fb.group(
      {
        title:['',[Validators.required]],
        date:['',[Validators.required]],
        location:['',[Validators.required]],
        date_time:['',[Validators.required]],
        description:['',[Validators.required]],
        time:['',[Validators.required]]
      }
    )
  }
}
