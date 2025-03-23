export interface Expense {
    id: string;
    itineraryId: string;
    title: string;
    amount: number;
    category: string;
    date: Date;
    paidBy: string;
    splitBetween: string[];
    receipt?: string;
    notes?: string;
    status: 'pending' | 'settled';
    createdAt: Date;
    updatedAt: Date;
}

export interface ExpenseSummary {
    totalExpenses: number;
    byCategory: { [key: string]: number };
    byPerson: { [key: string]: number };
    pending: number;
    settled: number;
} 