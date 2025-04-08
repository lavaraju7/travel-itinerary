import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../common/header/header.component';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, RouterModule, CommonModule, HeaderComponent],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent implements OnInit {
  itineraries: any = []
  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    this.getItineraries()
  }
  navigateToCreate(id: number = 0) {
    if (id) {
      this.router.navigate(['/update-itinerary', id])
    } else {
      this.router.navigate(['/update-itinerary'])
    }
  }

  navigateToView(id: any) {
    this.router.navigate([`view-itinerary/${id}`])
  }

  getItineraries() {
    this.http.get('http://localhost:3000/api/v1/itineraries').subscribe({
      next: (response: any) => {
        console.log(response)
        if (response.success) {
          this.itineraries = response.data
        }
      },
      error(err) {
        console.log(err)
      }
    })
  }

  deleteItinerary(id: any) { }
}
