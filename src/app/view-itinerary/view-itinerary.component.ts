import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-itinerary',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule, MatTableModule],
  templateUrl: './view-itinerary.component.html',
  styleUrl: './view-itinerary.component.scss'
})
export class ViewItineraryComponent {
  itinerary: any;

  constructor(
    private route: ActivatedRoute, private http: HttpClient
  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getItineraryDetails(id);
    }
  }

  getItineraryDetails(id: string): void {
    this.http.get(`http://localhost:3000/api/v1/itinerary/${id}`).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.itinerary = response.data;
        }
      },
      error: (err) => {
        console.error('Error fetching itinerary details:', err);
      }
    });
  }

  onBack(): void {
    window.history.back();
  }

  getExpenses(itinerary: any) {
    (itinerary?.expenses ?? []).reduce((sum: any, e: any) => sum + e.amount, 0) || 0
  }
}
