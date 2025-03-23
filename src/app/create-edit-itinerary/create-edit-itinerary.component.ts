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
import { ActivatedRoute, Router } from '@angular/router';
import { ItineraryService } from '../../services/itinerary.service';
import { Itinerary, Destination, Activity } from '../models/itinerary.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-edit-itinerary',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './create-edit-itinerary.component.html',
  styleUrl: './create-edit-itinerary.component.scss'
})
export class CreateEditItineraryComponent implements OnInit {
  @ViewChildren('picker') destinationDatePickers!: any;
  itineraryForm!: FormGroup;
  itineraryId!: number | null;
  isLoading = false;

  constructor(
    private _fb: FormBuilder,
    private itineraryService: ItineraryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.itineraryId = Number(params.get('id')) ?? null;
    });

    this.initForm();

    if (this.itineraryId) {
      this.getItineraryDataForUpdate();
    }
  }

  private initForm(): void {
    this.itineraryForm = this._fb.group({
      title: ['', [Validators.required]],
      trip_start_date: ['', [Validators.required]],
      trip_end_date: ['', [Validators.required]],
      destinations: this._fb.array([]),
      total_budget: [0],
      status: ['draft']
    });
  }

  get destinations() {
    return this.itineraryForm.get('destinations') as FormArray;
  }

  removeDestination(index: number): void {
    if (this.itineraryId) {
      const destinationId = this.destinations.at(index).get('id')?.value;
      if (destinationId) {
        this.itineraryService.deleteDestination(this.itineraryId, destinationId)
          .subscribe({
            next: () => {
              this.destinations.removeAt(index);
              this.showSnackBar('Destination removed successfully');
            },
            error: (error) => {
              this.showSnackBar('Error removing destination', 'error');
            }
          });
      }
    } else {
      this.destinations.removeAt(index);
    }
  }

  getActivities(destinationIndex: number) {
    return this.destinations.at(destinationIndex).get('activities') as FormArray;
  }

  removeActivity(destinationIndex: number, activityIndex: number) {
    if (this.itineraryId) {
      const destinationId = this.destinations.at(destinationIndex).get('id')?.value;
      const activityId = this.getActivities(destinationIndex).at(activityIndex).get('id')?.value;

      if (destinationId && activityId) {
        this.itineraryService.deleteActivity(this.itineraryId, destinationId, activityId)
          .subscribe({
            next: () => {
              this.getActivities(destinationIndex).removeAt(activityIndex);
              this.showSnackBar('Activity removed successfully');
            },
            error: (error) => {
              this.showSnackBar('Error removing activity', 'error');
            }
          });
      }
    } else {
      this.getActivities(destinationIndex).removeAt(activityIndex);
    }
  }

  addDestination() {
    const destinationForm = this._fb.group({
      id: [null],
      location: ['', Validators.required],
      transportation_type: ['', Validators.required],
      date_time: ['', Validators.required],
      time: ['', Validators.required],
      activities: this._fb.array([]),
      accommodation: this._fb.group({
        name: [''],
        check_in: [''],
        check_out: [''],
        cost: [0]
      })
    });

    this.destinations.push(destinationForm);
  }

  addActivity(destinationIndex: number) {
    const activityForm = this._fb.group({
      id: [null],
      description: ['', Validators.required],
      activity_type: ['', Validators.required],
      time: ['', Validators.required],
      duration: [0],
      cost: [0],
      notes: ['']
    });

    this.getActivities(destinationIndex).push(activityForm);
  }

  onSubmit() {
    if (this.itineraryForm.valid) {
      this.isLoading = true;
      const formData = this.itineraryForm.value;

      if (this.itineraryId) {
        // Update existing itinerary
        this.itineraryService.updateItinerary(this.itineraryId.toString(), formData)
          .subscribe({
            next: (response) => {
              this.showSnackBar('Itinerary updated successfully');
              this.router.navigate(['/view-itinerary', this.itineraryId]);
            },
            error: (error) => {
              this.showSnackBar('Error updating itinerary', 'error');
            },
            complete: () => {
              this.isLoading = false;
            }
          });
      } else {
        // Create new itinerary
        this.itineraryService.createItinerary(formData)
          .subscribe({
            next: (response) => {
              this.showSnackBar('Itinerary created successfully');
              this.router.navigate(['/view-itinerary', response.id]);
            },
            error: (error) => {
              this.showSnackBar('Error creating itinerary', 'error');
            },
            complete: () => {
              this.isLoading = false;
            }
          });
      }
    }
  }

  onBack(): void {
    window.history.back();
  }

  private getItineraryDataForUpdate() {
    if (this.itineraryId) {
      this.isLoading = true;
      this.itineraryService.getItineraryById(this.itineraryId)
        .subscribe({
          next: (itinerary: any) => {
            this.patchDataForEdit(itinerary);
            this.isLoading = false;
          },
          error: (error) => {
            this.showSnackBar('Error loading itinerary', 'error');
            this.isLoading = false;
          }
        });
    }
  }

  private patchDataForEdit(itinerary: Itinerary) {
    // Clear existing destinations
    while (this.destinations.length) {
      this.destinations.removeAt(0);
    }

    // Add destinations and their activities
    itinerary.destinations.forEach((destination: any) => {
      this.addDestination();
      const lastIndex = this.destinations.length - 1;
      const destinationForm = this.destinations.at(lastIndex);

      destination.activities.forEach((activity: any) => {
        this.addActivity(lastIndex);
      });

      destinationForm.patchValue(destination);
    });

    // Patch the main form
    this.itineraryForm.patchValue({
      title: itinerary.title,
      trip_start_date: itinerary.trip_start_date,
      trip_end_date: itinerary.trip_end_date,
      total_budget: itinerary.total_budget,
      status: itinerary.status
    });
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
