import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ExpenseService } from '../expense.service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.fetchAllExpenses();
  }

  fetchAllExpenses(): void {
    this.expenseService.getAllExpenses().subscribe((data) => {
      console.log('Expenses data:', data);
      this.expenses = data;
      this.filteredExpenses = data;
      this.extractCategories();
    });
  }

  extractCategories(): void {
    this.categories = [...new Set(this.expenses.map((expense) => expense.category))];
  }

  filterByCategory(): void {
    if (this.selectedCategory) {
      this.expenseService.getExpensesByCategory(this.selectedCategory).subscribe((filteredData) => {
        this.filteredExpenses = filteredData;
      });
    } else {
      this.filteredExpenses = [...this.expenses];
    }
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        this.fetchAllExpenses();
      },
      error: (error) => {
        console.error('Error deleting expense:', error);
      }
    });
  }
}
