export interface Activity {
    id: string;
    title: string;
    description: string;
    location: string;
    date: Date;
    startTime: string;
    endTime: string;
    cost: number;
    category: string;
    notes: string;
}

export interface Destination {
    id?: number;
    location: string;
    transportation_type: string;
    date_time: string;
    time: string;
    activities: Activity[];
    accommodation?: {
        name: string;
        check_in: string;
        check_out: string;
        cost: number;
    };
}

export interface Itinerary {
    id: string;
    title: string;
    description: string;
    trip_start_date: Date;
    trip_end_date: Date;
    destinations: any;
    activities: Activity[];
    participants: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    total_budget: number;
    isPublic: boolean;
    status: 'draft' | 'planned' | 'in-progress' | 'completed' | 'cancelled';
} 