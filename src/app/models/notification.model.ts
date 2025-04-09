export interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    userId: string;
    data?: {
        itineraryId?: string;
        expenseId?: string;
        activityId?: string;
        [key: string]: any;
    };
} 