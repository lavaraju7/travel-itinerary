import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Itinerary, Activity, Destination } from '../models/itinerary.model';

@Injectable({
    providedIn: 'root'
})
export class ItineraryService {
    private readonly ITINERARY_ENDPOINT = 'itineraries';

    constructor(private apiService: ApiService) { }

    // Get all itineraries for the current user
    getAllItineraries(): Observable<Itinerary[]> {
        return this.apiService.get<Itinerary[]>(this.ITINERARY_ENDPOINT);
    }

    // Get a single itinerary by ID
    getItineraryById(id: string | number): Observable<Itinerary> {
        return this.apiService.get<Itinerary>(`${this.ITINERARY_ENDPOINT}/${id}`);
    }

    // Create a new itinerary
    createItinerary(itinerary: Omit<Itinerary, 'id' | 'createdAt' | 'updatedAt'>): Observable<Itinerary> {
        return this.apiService.post<Itinerary>(this.ITINERARY_ENDPOINT, itinerary);
    }

    // Update an existing itinerary
    updateItinerary(id: string, itinerary: Partial<Itinerary>): Observable<Itinerary> {
        return this.apiService.put<Itinerary>(`${this.ITINERARY_ENDPOINT}/${id}`, itinerary);
    }

    // Delete an itinerary
    deleteItinerary(id: string): Observable<void> {
        return this.apiService.delete<void>(`${this.ITINERARY_ENDPOINT}/${id}`);
    }

    // Add a destination to an itinerary
    addDestination(itineraryId: string, destination: Omit<Destination, 'id'>): Observable<Destination> {
        return this.apiService.post<Destination>(`${this.ITINERARY_ENDPOINT}/${itineraryId}/destinations`, destination);
    }

    // Update a destination in an itinerary
    updateDestination(itineraryId: string, destinationId: string, destination: Partial<Destination>): Observable<Destination> {
        return this.apiService.put<Destination>(`${this.ITINERARY_ENDPOINT}/${itineraryId}/destinations/${destinationId}`, destination);
    }

    // Delete a destination from an itinerary
    deleteDestination(itineraryId: string | number, destinationId: string | number): Observable<void> {
        return this.apiService.delete<void>(`${this.ITINERARY_ENDPOINT}/${itineraryId}/destinations/${destinationId}`);
    }

    // Add an activity to a destination
    addActivity(itineraryId: string, destinationId: string, activity: Omit<Activity, 'id'>): Observable<Activity> {
        return this.apiService.post<Activity>(`${this.ITINERARY_ENDPOINT}/${itineraryId}/destinations/${destinationId}/activities`, activity);
    }

    // Update an activity in a destination
    updateActivity(itineraryId: string, destinationId: string, activityId: string, activity: Partial<Activity>): Observable<Activity> {
        return this.apiService.put<Activity>(`${this.ITINERARY_ENDPOINT}/${itineraryId}/destinations/${destinationId}/activities/${activityId}`, activity);
    }

    // Delete an activity from a destination
    deleteActivity(itineraryId: string | number, destinationId: string | number, activityId: string | number): Observable<void> {
        return this.apiService.delete<void>(`${this.ITINERARY_ENDPOINT}/${itineraryId}/destinations/${destinationId}/activities/${activityId}`);
    }

    getRecentItineraries(): Observable<Itinerary[]> {
        return this.apiService.get<Itinerary[]>(`${this.ITINERARY_ENDPOINT}/recent`);
    }

    getUpcomingTrips(): Observable<Itinerary[]> {
        return this.apiService.get<Itinerary[]>(`${this.ITINERARY_ENDPOINT}/upcoming`);
    }

    getItinerary(id: string): Observable<Itinerary> {
        return this.apiService.get<Itinerary>(`${this.ITINERARY_ENDPOINT}/${id}`);
    }
} 