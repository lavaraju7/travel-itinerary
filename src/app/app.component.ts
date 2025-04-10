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
    templateUrl: `./app.component.html`,
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
