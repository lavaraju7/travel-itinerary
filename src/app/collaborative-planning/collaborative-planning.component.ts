import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-collaborative-planning',
  standalone: true,
  imports: [MatIconModule,MatToolbarModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './collaborative-planning.component.html',
  styleUrl: './collaborative-planning.component.scss'
})
export class CollaborativePlanningComponent {

}
