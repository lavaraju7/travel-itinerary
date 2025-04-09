import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Expense, ExpenseSummary } from '../models/expense.model';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private readonly EXPENSE_ENDPOINT = 'expenses';
    private expensesSubject = new BehaviorSubject<Expense[]>([]);

    constructor(private apiService: ApiService) {
        this.loadExpenses();
    }

    private loadExpenses() {
        this.apiService.get<Expense[]>(this.EXPENSE_ENDPOINT).subscribe({
            next: (expenses) => {
                this.expensesSubject.next(expenses || []);
            },
            error: (error) => {
                console.error('Error loading expenses:', error);
            }
        });
    }

    getExpenses(): Observable<Expense[]> {
        return this.expensesSubject.asObservable();
    }

    getExpensesByItinerary(itineraryId: string): Observable<Expense[]> {
        return this.apiService.get<Expense[]>(`${this.EXPENSE_ENDPOINT}/itinerary/${itineraryId}`);
    }

    getRecentExpenses(): Observable<Expense[]> {
        return this.apiService.get<Expense[]>(`${this.EXPENSE_ENDPOINT}/recent`);
    }

    addExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Observable<Expense> {
        return this.apiService.post<Expense>(this.EXPENSE_ENDPOINT, expense);
    }

    updateExpense(id: string, expense: Partial<Expense>): Observable<Expense> {
        return this.apiService.put<Expense>(`${this.EXPENSE_ENDPOINT}/${id}`, expense);
    }

    deleteExpense(id: string): Observable<void> {
        return this.apiService.delete<void>(`${this.EXPENSE_ENDPOINT}/${id}`);
    }

    getExpenseSummary(itineraryId: string): Observable<ExpenseSummary> {
        return this.apiService.get<ExpenseSummary>(`${this.EXPENSE_ENDPOINT}/summary/${itineraryId}`);
    }

    uploadReceipt(id: string, file: File): Observable<Expense> {
        const formData = new FormData();
        formData.append('receipt', file);
        return this.apiService.post<Expense>(`${this.EXPENSE_ENDPOINT}/${id}/receipt`, formData);
    }

    settleExpenses(itineraryId: string): Observable<void> {
        return this.apiService.get<void>(`${this.EXPENSE_ENDPOINT}/settle/${itineraryId}`);
    }
} 