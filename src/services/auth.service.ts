import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { EncryptionService } from './encryption.service';

export interface User {
    id?: number;
    username: string;
    email: string;
    profile_picture?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface SignupData extends LoginCredentials {
    email: string;
    confirmPassword: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly AUTH_ENDPOINT = 'auth';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private encryptionService: EncryptionService
    ) {
        // Check if user is already logged in
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                const decryptedUser = this.encryptionService.decrypt(storedUser);
                this.currentUserSubject.next(decryptedUser);
            } catch (error) {
                console.error('Error decrypting stored user:', error);
                this.logout();
            }
        }
    }

    login(credentials: LoginCredentials): Observable<User> {
        return this.apiService.post<User>(`${this.AUTH_ENDPOINT}/login`, credentials)
            .pipe(
                tap(user => {
                    // Store user in localStorage
                    const encryptedUser = this.encryptionService.encrypt(user);
                    localStorage.setItem('currentUser', encryptedUser);
                    this.currentUserSubject.next(user);
                })
            );
    }

    signup(signupData: SignupData): Observable<User> {
        return this.apiService.post<User>(`${this.AUTH_ENDPOINT}/signup`, signupData)
            .pipe(
                tap(user => {
                    // Store user in localStorage
                    const encryptedUser = this.encryptionService.encrypt(user);
                    localStorage.setItem('currentUser', encryptedUser);
                    this.currentUserSubject.next(user);
                })
            );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    updateProfile(userData: Partial<User>): Observable<User> {
        return this.apiService.put<User>(`${this.AUTH_ENDPOINT}/profile`, userData)
            .pipe(
                tap(user => {
                    const encryptedUser = this.encryptionService.encrypt(user);
                    localStorage.setItem('currentUser', encryptedUser);
                    this.currentUserSubject.next(user);
                })
            );
    }

    changePassword(oldPassword: string, newPassword: string): Observable<void> {
        return this.apiService.post<void>(`${this.AUTH_ENDPOINT}/change-password`, {
            oldPassword,
            newPassword
        });
    }

    resetPassword(email: string): Observable<void> {
        return this.apiService.post<void>(`${this.AUTH_ENDPOINT}/reset-password`, { email });
    }
} 