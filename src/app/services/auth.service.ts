import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor() {
        // Check if user is logged in (you can add token check here)
        const token = localStorage.getItem('auth_token');
        this.isAuthenticatedSubject.next(!!token);
    }

    login(email: string, password: string): Observable<any> {
        // For demo purposes, we'll simulate a successful login
        // In a real app, this would make an HTTP request to your backend
        return of({ token: 'demo-token' }).pipe(
            tap(response => {
                localStorage.setItem('auth_token', response.token);
                this.isAuthenticatedSubject.next(true);
            })
        );
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }
} 