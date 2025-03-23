import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as L from 'leaflet';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class MapComponent implements OnInit, OnDestroy {
    @ViewChild('map') mapElement!: ElementRef;
    @Input() markers: L.LatLngExpression[] = [];
    @Input() center: L.LatLngExpression = [0, 0];
    @Input() zoom = 13;

    private map: L.Map | null = null;
    private mapMarkers: L.Marker[] = [];

    ngOnInit() {
        this.initMap();
    }

    ngOnDestroy() {
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }

    private initMap() {
        this.map = L.map(this.mapElement.nativeElement).setView(this.center, this.zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.addMarkers();
    }

    private addMarkers() {
        this.clearMarkers();
        this.markers.forEach(position => {
            const marker = L.marker(position).addTo(this.map!);
            this.mapMarkers.push(marker);
        });
        this.fitBounds();
    }

    private clearMarkers() {
        this.mapMarkers.forEach(marker => marker.remove());
        this.mapMarkers = [];
    }

    private fitBounds() {
        if (this.mapMarkers.length > 0) {
            const bounds = L.latLngBounds(this.mapMarkers.map(marker => marker.getLatLng()));
            this.map!.fitBounds(bounds, { padding: [50, 50] });
        }
    }

    zoomIn() {
        if (this.map) {
            this.map.zoomIn();
        }
    }

    zoomOut() {
        if (this.map) {
            this.map.zoomOut();
        }
    }

    resetView() {
        if (this.map) {
            this.map.setView(this.center, this.zoom);
        }
    }
} 