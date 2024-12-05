import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from './models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private apiUrl = 'https://localhost:7256/api/budget';

  constructor(private http: HttpClient) {}

  getBudget(): Observable<Budget> {
    return this.http.get<Budget>(this.apiUrl);
  }

  setBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, budget); 
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(this.apiUrl, budget); 
  }

  getBudgetProgress(): Observable<{ progress: number }> {
    return this.http.get<{ progress: number }>(`${this.apiUrl}/budget-progress`);
  }
}
