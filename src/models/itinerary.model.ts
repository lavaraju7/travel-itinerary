export interface Itinerary {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    destinations: string[];
    activities: Activity[];
    participants: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    isPublic: boolean;
    status: 'draft' | 'planned' | 'in-progress' | 'completed' | 'cancelled';
}

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
    id: string;
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    activities: Activity[];
    notes: string;
} 