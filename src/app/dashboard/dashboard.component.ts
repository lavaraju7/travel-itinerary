import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ItineraryService } from '../../services/itinerary.service';
import { NotificationService } from '../../services/notification.service';
import { ExpenseService } from '../../services/expense.service';
import { MapComponent } from '../map/map.component';
import { CreateItineraryDialogComponent } from './create-itinerary-dialog/create-itinerary-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Itinerary } from '../../models/itinerary.model';
import { Expense } from '../../models/expense.model';
import { firstValueFrom } from 'rxjs';
import { HeaderComponent } from '../common/header/header.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatBadgeModule,
        MatMenuModule,
        MatTooltipModule,
        MatDialogModule,
        RouterModule,
        MapComponent,
        HeaderComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    recentItineraries: Itinerary[] = [];
    upcomingTrips: Itinerary[] = [];
    expenses: Expense[] = [];
    notifications: Notification[] = [];
    unreadNotifications = 0;
    isLoading = false;
    mapMarkers: any[] = [];
    mapCenter = { lat: 0, lng: 0 };
    mapZoom = 2;

    constructor(
        private itineraryService: ItineraryService,
        private notificationService: NotificationService,
        private expenseService: ExpenseService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.loadDashboardData();
        this.setupNotifications();
        this.loadMapData();
    }

    private async loadDashboardData() {
        this.isLoading = true;
        try {
            const [itineraries, trips, expenses] = await Promise.all([
                firstValueFrom(this.itineraryService.getRecentItineraries()),
                firstValueFrom(this.itineraryService.getUpcomingTrips()),
                firstValueFrom(this.expenseService.getRecentExpenses())
            ]);

            this.recentItineraries = itineraries || [];
            this.upcomingTrips = trips || [];
            this.expenses = expenses || [];
        } catch (error) {
            this.showSnackBar('Error loading dashboard data', 'error');
        } finally {
            this.isLoading = false;
        }
    }

    private setupNotifications() {
        this.notificationService.getNotifications().subscribe({
            next: (notifications: any) => {
                if (notifications) {
                    this.notifications = notifications;
                    this.unreadNotifications = notifications.filter((n: any) => !n.read).length;
                }
            }
        });
    }

    private loadMapData() {
        // TODO: Load map data from itinerary service
        this.mapMarkers = [
            { lat: 48.8566, lng: 2.3522, title: 'Paris' },
            { lat: 35.6762, lng: 139.6503, title: 'Tokyo' },
            { lat: 40.7128, lng: -74.0060, title: 'New York' }
        ];
        this.mapCenter = { lat: 20, lng: 0 };
    }

    openCreateItineraryDialog() {
        const dialogRef = this.dialog.open(CreateItineraryDialogComponent, {
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.itineraryService.createItinerary(result).subscribe({
                    next: () => {
                        this.showSnackBar('Itinerary created successfully');
                        this.loadDashboardData();
                    },
                    error: (error) => {
                        this.showSnackBar(error.message || 'Failed to create itinerary', 'error');
                    }
                });
            }
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