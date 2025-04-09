import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MapComponent } from './map/map.component';
import { CreateItineraryDialogComponent } from './dashboard/create-itinerary-dialog/create-itinerary-dialog.component';
import { AvatarUploadDialogComponent } from './profile/avatar-upload-dialog/avatar-upload-dialog.component';
import { EditProfileDialogComponent } from './profile/edit-profile-dialog/edit-profile-dialog.component';

// Services
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ItineraryService } from '../services/itinerary.service';
import { NotificationService } from '../services/notification.service';
import { ExpenseService } from '../services/expense.service';
import { UploadService } from '../services/upload.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Routes
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        // Material Modules
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatMenuModule,
        MatBadgeModule,
        MatChipsModule,
        MatDividerModule,
        MatExpansionModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatTabsModule,
        MatStepperModule,
        MatGridListModule,
        MatButtonToggleModule,
        MatSliderModule,
        MatProgressSpinnerModule,
        MatRippleModule,
        // Standalone Components
        AppComponent,
        DashboardComponent,
        ProfileComponent,
        SettingsComponent,
        MapComponent,
        CreateItineraryDialogComponent,
        AvatarUploadDialogComponent,
        EditProfileDialogComponent
    ],
    providers: [
        ApiService,
        AuthService,
        ItineraryService,
        NotificationService,
        ExpenseService,
        UploadService,
        AuthGuard
    ]
})
export class AppModule { } 