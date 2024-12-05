import { Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { SetBudgetComponent } from './set-budget/set-budget.component';
import { BudgetComponent } from './budget/budget.component';
import { ExpenseChartComponent } from './expense-chart/expense-chart.component';

export const routes: Routes = [
    { path: '', redirectTo: '/budget', pathMatch: 'full' },
    { path: 'budget', component: BudgetComponent },
    { path: 'add-expense', component: AddExpenseComponent },
    { path: 'expense-list', component: ExpenseListComponent },
    { path: 'set-budget', component: SetBudgetComponent },
    { path: 'expense-chart', component: ExpenseChartComponent }, 
    { path: '**', redirectTo: '/budget' },
  ];