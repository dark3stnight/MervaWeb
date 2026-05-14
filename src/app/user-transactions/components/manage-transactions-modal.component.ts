import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from '../../state/app-state.service';
import { ExpenseService } from '../../user-expense/services/expense.service';
import { IncomeService } from '../../user-income/services/income.service';

@Component({
  selector: 'app-manage-transactions-modal',
  standalone: true,
  imports: [],
  templateUrl: './manage-transactions-modal.component.html',
  styleUrl: './manage-transactions-modal.component.scss',
})
export class ManageTransactionsModalComponent {
  readonly modal = inject(NgbActiveModal);
  private expenseService = inject(ExpenseService);
  private incomeService = inject(IncomeService);
  private appState = inject(AppStateService);

  activeTab: 'expenses' | 'incomes' = 'expenses';
  deletingExpenseId: number | null = null;
  deletingIncomeId: number | null = null;
  readonly error = '';

  get expenses() { return this.appState.expenses(); }
  get incomes() { return this.appState.incomes(); }
  get loading() { return this.appState.loading(); }

  deleteExpense(id: number) {
    this.deletingExpenseId = id;
    this.expenseService.delete(id).subscribe({
      next: () => {
        this.deletingExpenseId = null;
        this.appState.loadAll();
      },
      error: () => { this.deletingExpenseId = null; },
    });
  }

  deleteIncome(id: number) {
    this.deletingIncomeId = id;
    this.incomeService.delete(id).subscribe({
      next: () => {
        this.deletingIncomeId = null;
        this.appState.loadAll();
      },
      error: () => { this.deletingIncomeId = null; },
    });
  }

  close() {
    this.modal.dismiss();
  }

  formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.substring(0, 10).split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatAmount(amount: number, currency: string): string {
    try {
      return amount.toLocaleString('en-US', { style: 'currency', currency: currency || 'USD' });
    } catch {
      return `${currency ?? 'USD'} ${amount.toFixed(2)}`;
    }
  }
}
