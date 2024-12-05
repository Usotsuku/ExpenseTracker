import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map,tap,catchError } from 'rxjs/operators';  
import { Expense } from './models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'https://localhost:7256/api/expenses';

  constructor(private http: HttpClient) {}

  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}`).pipe(
      tap(response => console.log('Expenses from API:', response)),  
      catchError(error => {
        console.error('Error fetching expenses:', error);
        return of([]);  
      })
    );
  }
  
  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${expense.id}`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getExpensesByCategory(category: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/category/${category}`).pipe(
      tap(response => console.log(`Filtered expenses for category ${category}:`, response)),
      catchError(error => {
        console.error(`Error fetching expenses for category ${category}:`, error);
        return of([]);
      })
    );
  }
}
