import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-expense-tracking',
  standalone: true,
  imports: [MatIconModule,MatToolbarModule,MatCardModule,MatFormFieldModule,MatButtonModule],
  templateUrl: './expense-tracking.component.html',
  styleUrl: './expense-tracking.component.scss'
})
export class ExpenseTrackingComponent {

}
