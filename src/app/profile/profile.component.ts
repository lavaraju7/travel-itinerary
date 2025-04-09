import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    fullName: string;
    bio: string;
    avatar: string;
    location: string;
    joinDate: Date;
    stats: {
        trips: number;
        followers: number;
        following: number;
    };
    interests: string[];
    recentTrips: {
        id: string;
        title: string;
        destination: string;
        startDate: Date;
        endDate: Date;
        thumbnail: string;
    }[];
}

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatTabsModule,
        MatListModule,
        MatChipsModule
    ],
    templateUrl: './profile.component.html',
    styles: [`
    @import '../../styles/shared.scss';

    .page-container {
      padding: $spacing-lg;
      max-width: 1200px;
      margin: 0 auto;
    }

    .profile-header {
      margin-bottom: $spacing-lg;
      overflow: hidden;

      .profile-cover {
        height: 200px;
        background: linear-gradient(45deg, $color-primary, $color-secondary);
      }

      .profile-info {
        padding: $spacing-lg;
        margin-top: -60px;
        position: relative;
      }

      .profile-avatar {
        position: relative;
        display: inline-block;

        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: $shadow-md;
        }

        .edit-avatar {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: white;
          box-shadow: $shadow-sm;

          &:hover {
            background-color: $color-background-light;
          }
        }
      }

      .profile-details {
        margin-top: $spacing-md;

        h1 {
          @include heading-1;
          margin: 0;
        }

        .username {
          @include body-text;
          color: $color-text-secondary;
          margin: $spacing-xs 0;
        }

        .bio {
          @include body-text;
          margin: $spacing-sm 0;
        }

        .profile-meta {
          display: flex;
          gap: $spacing-md;
          margin: $spacing-sm 0;
          color: $color-text-secondary;

          span {
            display: flex;
            align-items: center;
            gap: $spacing-xs;

            mat-icon {
              font-size: 16px;
            }
          }
        }

        .profile-stats {
          display: flex;
          gap: $spacing-xl;
          margin: $spacing-md 0;

          .stat-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            .stat-value {
              @include heading-3;
              color: $color-primary;
            }

            .stat-label {
              @include body-text;
              color: $color-text-secondary;
            }
          }
        }

        .profile-actions {
          display: flex;
          gap: $spacing-md;
          margin-top: $spacing-md;
        }
      }
    }

    .profile-content {
      .tab-content {
        padding: $spacing-lg;
      }

      .interests-section,
      .bio-section {
        margin-bottom: $spacing-lg;

        h2 {
          @include heading-2;
          margin-bottom: $spacing-md;
        }
      }

      .interests-list {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-sm;
      }

      .trips-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: $spacing-lg;

        .trip-card {
          img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          h3 {
            @include heading-4;
            margin: $spacing-sm 0 $spacing-xs;
          }

          p {
            @include body-text;
            color: $color-text-secondary;
            margin: 0 0 $spacing-sm;
          }

          .trip-meta {
            display: flex;
            align-items: center;
            gap: $spacing-xs;
            color: $color-text-secondary;
            font-size: $font-size-sm;

            mat-icon {
              font-size: 16px;
            }
          }
        }
      }
    }

    @media (max-width: $breakpoint-md) {
      .profile-header {
        .profile-details {
          .profile-meta {
            flex-direction: column;
            gap: $spacing-sm;
          }

          .profile-stats {
            justify-content: space-around;
          }

          .profile-actions {
            flex-direction: column;
          }
        }
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
    profile: UserProfile = {
        id: '',
        username: '',
        email: '',
        fullName: '',
        bio: '',
        avatar: '',
        location: '',
        joinDate: new Date(),
        stats: {
            trips: 0,
            followers: 0,
            following: 0
        },
        interests: [],
        recentTrips: []
    };

    recentActivity = [
        {
            icon: 'flight',
            title: 'New Trip Created',
            description: 'Created a new trip to Paris',
            timestamp: new Date()
        },
        {
            icon: 'photo_camera',
            title: 'Added Photos',
            description: 'Added 5 photos to Tokyo trip',
            timestamp: new Date()
        },
        {
            icon: 'comment',
            title: 'New Comment',
            description: 'Commented on a trip to New York',
            timestamp: new Date()
        }
    ];

    constructor(
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.loadProfile();
    }

    private loadProfile(): void {
        // TODO: Load profile from API
        this.profile = {
            id: '1',
            username: 'johndoe',
            email: 'john@example.com',
            fullName: 'John Doe',
            bio: 'Travel enthusiast and adventure seeker. Love exploring new places and meeting new people.',
            avatar: 'https://via.placeholder.com/150',
            location: 'New York, USA',
            joinDate: new Date('2023-01-01'),
            stats: {
                trips: 12,
                followers: 245,
                following: 189
            },
            interests: ['Adventure', 'Photography', 'Food', 'Culture', 'Nature'],
            recentTrips: [
                {
                    id: '1',
                    title: 'Paris Adventure',
                    destination: 'Paris, France',
                    startDate: new Date('2024-06-01'),
                    endDate: new Date('2024-06-10'),
                    thumbnail: 'https://via.placeholder.com/300x200'
                },
                {
                    id: '2',
                    title: 'Tokyo Explorer',
                    destination: 'Tokyo, Japan',
                    startDate: new Date('2024-07-15'),
                    endDate: new Date('2024-07-25'),
                    thumbnail: 'https://via.placeholder.com/300x200'
                }
            ]
        };
    }

    onEditProfile(): void {
        const dialogRef = this.dialog.open(EditProfileDialogComponent, {
            width: '600px',
            data: this.profile
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.profile = result;
                this.snackBar.open('Profile updated successfully', 'Close', {
                    duration: 3000
                });
            }
        });
    }

    onEditAvatar(): void {
        // TODO: Open avatar upload dialog
        this.snackBar.open('Avatar upload feature coming soon', 'Close', {
            duration: 3000
        });
    }
} 