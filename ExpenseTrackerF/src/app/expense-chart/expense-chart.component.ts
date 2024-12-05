import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';  // Import NgChartsModule
import { ChartConfiguration, ChartData, TooltipItem } from 'chart.js';  // Import TooltipItem
import { ExpenseService } from '../expense.service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.css'],
})
export class ExpenseChartComponent implements OnInit {
  expenses: Expense[] = [];
  chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF5733'],
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
  callbacks: {
    label: (tooltipItem: TooltipItem<'pie'>) => {
      const value = Number(tooltipItem.raw);  
      return `${tooltipItem.label}: $${value.toFixed(2)}`;
    },
  },
},
    },
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getAllExpenses().subscribe((expenses: Expense[]) => {
      this.expenses = expenses;
      this.updateChartData();
    });
  }

  updateChartData() {
    const categories = ['Food', 'Transport', 'Entertainment', 'Other'];
    const categoryTotals: Record<string, number> = categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {} as Record<string, number>);

    this.expenses.forEach(expense => {
      const category = expense.category || 'Other';
      if (categoryTotals[category] !== undefined) {
        categoryTotals[category] += expense.amount;
      }
    });

    this.chartData.labels = Object.keys(categoryTotals);
    this.chartData.datasets[0].data = Object.values(categoryTotals);
  }
}
