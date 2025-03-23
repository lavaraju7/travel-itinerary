import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    private apiUrl = `${environment.apiUrl}/upload`;

    constructor(private http: HttpClient) { }

    uploadAvatar(file: File): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'avatar');

        const req = new HttpRequest('POST', `${this.apiUrl}/avatar`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    uploadReceipt(file: File, itineraryId: string): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'receipt');
        formData.append('itineraryId', itineraryId);

        const req = new HttpRequest('POST', `${this.apiUrl}/receipt`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    uploadImage(file: File, type: 'activity' | 'destination'): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);

        const req = new HttpRequest('POST', `${this.apiUrl}/image`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    deleteFile(fileId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${fileId}`);
    }
} 