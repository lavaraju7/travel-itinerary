import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { CreateEditItineraryComponent } from './create-edit-itinerary/create-edit-itinerary.component';
import { ViewItineraryComponent } from './view-itinerary/view-itinerary.component';
import { CollaborativePlanningComponent } from './collaborative-planning/collaborative-planning.component';
import { ExpenseTrackingComponent } from './expense-tracking/expense-tracking.component';
import { NotifyRemindComponent } from './notify-remind/notify-remind.component';
import { MapIntegrationComponent } from './map-integration/map-integration.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SettingsComponent } from './settings/settings.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path:'login',component:LoginRegisterComponent},
    {path:'dashboard',component:HomeDashboardComponent},
    {path:'update-itinerary',component:CreateEditItineraryComponent},
    {path:'view-itinerary/:id',component:ViewItineraryComponent},
    {path:'collaborations',component:CollaborativePlanningComponent},
    {path:'expense-track',component:ExpenseTrackingComponent},
    {path:'notifications',component:NotifyRemindComponent},
    {path:'maps',component:MapIntegrationComponent},
    {path:'feedback',component:FeedbackComponent},
    {path:'settings',component:SettingsComponent},
    {path:'user-profile',component:UserProfileComponent},
    {path:'signup',component:SignupComponent},
    {path:'**',redirectTo:'login',pathMatch:'full'},
];