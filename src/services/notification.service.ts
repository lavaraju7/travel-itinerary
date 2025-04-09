import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private apiService: ApiService) { }

    getNotifications(): Observable<Notification[]> {
        return this.apiService.get<Notification[]>('notifications');
    }

    markAsRead(id: string): Observable<void> {
        return this.apiService.put<void>(`notifications/${id}/read`, {});
    }

    markAllAsRead(): Observable<void> {
        return this.apiService.put<void>('notifications/read-all', {});
    }

    deleteNotification(id: string): Observable<void> {
        return this.apiService.delete<void>(`notifications/${id}`);
    }
} 