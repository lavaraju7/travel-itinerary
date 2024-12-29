import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-notify-remind',
  standalone: true,
  imports: [MatCardModule,MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './notify-remind.component.html',
  styleUrl: './notify-remind.component.scss'
})
export class NotifyRemindComponent {

}
