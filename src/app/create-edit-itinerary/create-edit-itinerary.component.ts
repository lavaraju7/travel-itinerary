import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit-itinerary',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatFormFieldModule, MatToolbarModule, MatButtonModule, ReactiveFormsModule, MatInputModule, CommonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './create-edit-itinerary.component.html',
  styleUrl: './create-edit-itinerary.component.scss'
})
export class CreateEditItineraryComponent implements OnInit {
  @ViewChildren('picker') destinationDatePickers!: any;
  itineraryForm!: FormGroup
  itineraryId!: number | null
  updateData: any
  constructor(private _fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.itineraryId = Number(params.get('id')) ?? null; // Get the 'id' parameter
      console.log('Itinerary ID:', this.itineraryId); // Debugging log
    });
    this.itineraryForm = this._fb.group(
      {
        title: ['', [Validators.required]],
        trip_start_date: ['', [Validators.required]],
        trip_end_date: ['', [Validators.required]],
        destinations: this._fb.array([]),
      }
    )
    if (this.itineraryId) {
      this.getItineraryDataForUpdate()
    }
  }
  // Getter for activities FormArray
  get activities() {
    return this.itineraryForm.get('activities') as FormArray;
  }

  removeDestination(index: number): void {
    this.destinations.removeAt(index);
  }

  removeActivity(destinationIndex: number, activityIndex: number) {
    // Get the destination form array at the provided destination index
    const destinationFormArray = this.getActivities(destinationIndex);

    // Remove the activity form group at the provided activity index
    destinationFormArray.removeAt(activityIndex);
  }

  get destinations() {
    return (this.itineraryForm.get('destinations') as FormArray);
  }

  addDestination() {
    const destinationForm = this._fb.group({
      location: ['', Validators.required],
      transportation_type: ['', Validators.required],
      date_time: ['', Validators.required],
      time: ['', Validators.required],
      activities: this._fb.array([])  // Add activities array to each destination
    });

    this.destinations.push(destinationForm);
  }

  getActivities(destinationIndex: number) {
    return (this.destinations.at(destinationIndex).get('activities') as FormArray);
  }

  addActivity(destinationIndex: number) {
    const activityForm = this._fb.group({
      description: ['', Validators.required],
      activity_type: ['', Validators.required],
      time: ['', Validators.required],
    });

    this.getActivities(destinationIndex).push(activityForm);
  }

  onSubmit() {
    this.http.post('http://localhost:3000/api/v1/itinerary', this.itineraryForm.value).subscribe({
      next: (response) => {
        console.log(response)
      }, error(err) {

      }, complete() {

      },
    })
  }

  onBack(): void {
    window.history.back();
  }

  getItineraryDataForUpdate() {
    //* replace with API calls
    this.updateData = {
      title: 'Tirupathi',
      trip_start_date: '2024-09-09',
      trip_end_date: '2024-09-10',
      destinations: [{
        location: 'Tirumala',
        transportation_type: 'Bus',
        date_time: '2024-09-09',
        time: '6:00',
        activities: [
          {
            description: 'trekking to top',
            activity_type: 'Trekking',
            time: 7,
          }
        ]
      }, {
        location: 'Tirumala',
        transportation_type: 'Bus',
        date_time: '2024-09-09',
        time: '6:00',
        activities: [
          {
            description: 'trekking to top',
            activity_type: 'Trekking',
            time: 7,
          }
        ]
      }],
    }
    this.patchDataForEdit()
  }
  patchDataForEdit() {
    let index = 0
    for (const destination of this.updateData.destinations) {
      this.addDestination()
      for (const activity of destination.activities) {
        this.addActivity(index)
      }
      index += 1
    }
    this.itineraryForm.patchValue(this.updateData)
  }

}
