import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-itinerary',
  standalone: true,
  imports: [MatCardModule,MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './view-itinerary.component.html',
  styleUrl: './view-itinerary.component.scss'
})
export class ViewItineraryComponent {

}
