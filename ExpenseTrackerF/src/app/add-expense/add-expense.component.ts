  import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
  import { ExpenseService } from '../expense.service';
  import { BudgetService } from '../budget.service';

  @Component({
    selector: 'app-add-expense',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-expense.component.html',
  })
  export class AddExpenseComponent {
    expenseForm: FormGroup;
    notification: string | null = null; 
    isWarning: boolean = false; 

    constructor(
      private fb: FormBuilder,
      private expenseService: ExpenseService,
      private budgetService: BudgetService
    ) {
      this.expenseForm = this.fb.group({
        title: ['', Validators.required],
        category: ['', Validators.required],
        amount: [0, [Validators.required, Validators.min(1)]],
        date: ['', Validators.required],
      });
    }

    onSubmit() {
      if (this.expenseForm.valid) {
        const expense = this.expenseForm.value;
        this.expenseService.addExpense(expense).subscribe({
          next: () => {
            this.expenseForm.reset();
            this.checkBudget(); // Check budget after adding the expense
          },
          error: (error) => {
            console.error('Error adding expense:', error);
            this.notification = 'Failed to add expense You have exceeded your budget!';
            this.isWarning = true;
          },
        });
      }
    }

    private checkBudget() {
      this.budgetService.getBudgetProgress().subscribe({
        next: (progress) => {
          if (progress.progress > 100) {
            this.notification = 'Warning: You have exceeded your budget!';
            this.isWarning = true;
          } else if (progress.progress > 80) {
            this.notification = 'Caution: You are nearing your budget limit!';
            this.isWarning = false;
          } else {
            this.notification = 'Expense added successfully!';
            this.isWarning = false;
          }
        },
        error: (error) => {
          console.error('Error fetching budget progress:', error);
          this.notification = 'Expense added, but failed to check budget status.';
          this.isWarning = true;
        },
      });
    }
  }
