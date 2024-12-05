import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { Budget } from '../models/budget.model';
import { ExpenseService } from '../expense.service';
import { Expense } from '../models/expense.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  budget: Budget | null = null;
  budgetProgress: number = 0;
  spentSoFar: number = 0;
  remainingBudget: number = 0;
  showWarning: boolean = false;

  constructor(
    private budgetService: BudgetService,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.budgetService.getBudget().subscribe({
      next: (data) => {
        this.budget = data;
        this.expenseService.getAllExpenses().subscribe({
          next: (expenses: Expense[]) => {
            this.calculateSpentSoFar(expenses);
            this.calculateRemainingBudget();
          },
          error: (err) => {
            console.error('Error fetching expenses:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching budget:', err);
      }
    });

    this.budgetService.getBudgetProgress().subscribe({
      next: (progressData) => {
        this.budgetProgress = progressData.progress;
        this.showWarning = this.budgetProgress > 80;  // Show warning if over 80%
      },
      error: (err) => {
        console.error('Error fetching budget progress:', err);
      }
    });
  }

  calculateSpentSoFar(expenses: Expense[]): void {
    this.spentSoFar = expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  calculateRemainingBudget(): void {
    if (this.budget) {
      this.remainingBudget = this.budget.monthlyBudget - this.spentSoFar;
    }
  }

  getDonutBackground(): string {
    const progress = Math.min(Math.max(this.budgetProgress, 0), 100); // Ensure it's between 0 and 100

    if (progress <= 50) {
      return `conic-gradient(green ${progress}%, gray ${progress}%)`;
    } else if (progress <= 75) {
      return `conic-gradient(orange ${progress}%, gray ${progress}%)`;
    } else {
      return `conic-gradient(red ${progress}%, gray ${progress}%)`;
    }
  }
}
