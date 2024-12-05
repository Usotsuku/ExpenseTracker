import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-budget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './set-budget.component.html',
})
export class SetBudgetComponent {
  budgetForm: FormGroup;
  message: string = ''; 
  success: boolean = false; 

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({
      monthlyBudget: [0, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      const budget = this.budgetForm.value;
      this.budgetService.getBudget().subscribe({
        next: (existingBudget) => {
          if (existingBudget) {
            this.budgetService.updateBudget(budget).subscribe({
              next: (response) => {
                this.message = 'Budget updated successfully!';
                this.success = true;
                console.log('Budget updated successfully:', response);
                this.budgetForm.reset(); 
              },
              error: (error) => {
                this.message = 'Failed to update budget. Please try again.';
                this.success = false;
                console.error('Error updating budget:', error);
              },
            });
          } else {
            this.budgetService.setBudget(budget).subscribe({
              next: (response) => {
                this.message = 'Budget set successfully!';
                this.success = true;
                console.log('Budget set successfully:', response);
                this.budgetForm.reset();
              },
              error: (error) => {
                this.message = 'Failed to set budget. Please try again.';
                this.success = false;
                console.error('Error setting budget:', error);
              },
            });
          }
        },
        error: (error) => {
          console.error('Error checking existing budget:', error);
        },
      });
    }
  }
}
