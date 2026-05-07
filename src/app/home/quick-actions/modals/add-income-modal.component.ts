import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../../user-expense/models/expense-currency';
import { Category } from '../../../user-expense/models/expense-category';
import { IncomeService } from '../../../user-income/services/income.service';
import { TokenService } from '../../../user-token/services/token.service';

@Component({
  selector: 'app-add-income-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-income-modal.component.html',
})
export class AddIncomeModalComponent {
  readonly modal = inject(NgbActiveModal);
  private incomeService = inject(IncomeService);
  private tokenService = inject(TokenService);

  name = '';
  amount: number | null = null;
  currency = Currency.USD;
  category: Category | '' = '';
  incomeDate = new Date().toISOString().split('T')[0];
  submitting = false;
  error = '';

  readonly currencies = Object.values(Currency);
  readonly categories = Object.values(Category);

  submit() {
    const token = this.tokenService.getStoredToken();
    if (!token || !this.name.trim() || !this.amount) return;
    this.submitting = true;
    this.error = '';
    this.incomeService.add({
      token,
      name: this.name.trim(),
      amount: Math.abs(this.amount),
      currency: this.currency || undefined,
      category: this.category || undefined,
      incomeDate: this.incomeDate,
    }).subscribe({
      next: () => this.modal.close('added'),
      error: () => {
        this.error = 'Failed to add income. Please try again.';
        this.submitting = false;
      },
    });
  }
}
