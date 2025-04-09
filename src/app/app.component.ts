import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatBadgeModule,
        MatMenuModule
    ],
    template: `
        <!-- <mat-toolbar color="primary">
            <button mat-icon-button (click)="toggleSidenav()" *ngIf="isAuthenticated$ | async">
                <mat-icon>menu</mat-icon>
            </button>
            <span>Travel Itinerary</span>
            <span class="toolbar-spacer"></span>
            <button mat-icon-button [matMenuTriggerFor]="menu" *ngIf="isAuthenticated$ | async">
                <mat-icon [matBadge]="unreadNotifications" matBadgeColor="warn">notifications</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
                <button mat-menu-item>
                    <mat-icon>notifications</mat-icon>
                    <span>Notifications</span>
                </button>
                <button mat-menu-item>
                    <mat-icon>settings</mat-icon>
                    <span>Settings</span>
                </button>
                <button mat-menu-item (click)="logout()">
                    <mat-icon>exit_to_app</mat-icon>
                    <span>Logout</span>
                </button>
            </mat-menu>
        </mat-toolbar> -->

        <!-- <mat-sidenav-container>
            <mat-sidenav #sidenav mode="side" [opened]="isAuthenticated$ | async">
                <mat-nav-list>
                    <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
                        <mat-icon matListItemIcon>dashboard</mat-icon>
                        <span matListItemTitle>Dashboard</span>
                    </a>
                    <a mat-list-item routerLink="/profile" routerLinkActive="active">
                        <mat-icon matListItemIcon>person</mat-icon>
                        <span matListItemTitle>Profile</span>
                    </a>
                    <a mat-list-item routerLink="/settings" routerLinkActive="active">
                        <mat-icon matListItemIcon>settings</mat-icon>
                        <span matListItemTitle>Settings</span>
                    </a>
                </mat-nav-list>
            </mat-sidenav>

            <mat-sidenav-content>
                <div class="content">
                    <router-outlet></router-outlet>
                </div>
            </mat-sidenav-content>
        </mat-sidenav-container> -->
    `,
    styles: [`
        .toolbar-spacer {
            flex: 1 1 auto;
        }

        mat-sidenav-container {
            height: calc(100vh - 64px);
        }

        mat-sidenav {
            width: 250px;
        }

        .content {
            padding: 20px;
        }

        .active {
            background-color: rgba(255, 255, 255, 0.1);
        }

        mat-nav-list {
            padding-top: 0;
        }

        a[mat-list-item] {
            height: 48px;
        }
    `]
})
export class AppComponent implements OnInit {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    unreadNotifications = 3;
    isAuthenticated$: Observable<boolean>;

    constructor(private authService: AuthService) {
        this.isAuthenticated$ = this.authService.isAuthenticated$;
    }

    ngOnInit() {
        // Initialize sidenav state based on auth status
        this.isAuthenticated$.subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.sidenav?.open();
            } else {
                this.sidenav?.close();
            }
        });
    }

    toggleSidenav() {
        this.sidenav.toggle();
    }

    logout() {
        this.authService.logout();
    }
}
