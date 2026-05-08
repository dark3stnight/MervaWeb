import { Component, OnInit, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, forkJoin, of } from 'rxjs';
import { AddExpenseResponse, ExpenseService } from '../../user-expense/services/expense.service';
import { IncomeResponse, IncomeService } from '../../user-income/services/income.service';

@Component({
  selector: 'app-manage-transactions-modal',
  standalone: true,
  imports: [],
  templateUrl: './manage-transactions-modal.component.html',
})
export class ManageTransactionsModalComponent implements OnInit {
  readonly modal = inject(NgbActiveModal);
  private expenseService = inject(ExpenseService);
  private incomeService = inject(IncomeService);

  activeTab: 'expenses' | 'incomes' = 'expenses';
  expenses: AddExpenseResponse[] = [];
  incomes: IncomeResponse[] = [];
  loading = true;
  error = '';
  deletingExpenseId: number | null = null;
  deletingIncomeId: number | null = null;
  private hasChanged = false;

  ngOnInit() {
    forkJoin({
      expenses: this.expenseService.getAll().pipe(catchError(() => of([] as AddExpenseResponse[]))),
      incomes: this.incomeService.getAll().pipe(catchError(() => of([] as IncomeResponse[]))),
    }).subscribe({
      next: ({ expenses, incomes }) => {
        this.expenses = expenses;
        this.incomes = incomes;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load transactions.';
        this.loading = false;
      },
    });
  }

  deleteExpense(id: number) {
    this.deletingExpenseId = id;
    this.expenseService.delete(id).subscribe({
      next: () => {
        this.expenses = this.expenses.filter(e => e.expenseId !== id);
        this.deletingExpenseId = null;
        this.hasChanged = true;
      },
      error: () => { this.deletingExpenseId = null; },
    });
  }

  deleteIncome(id: number) {
    this.deletingIncomeId = id;
    this.incomeService.delete(id).subscribe({
      next: () => {
        this.incomes = this.incomes.filter(i => i.incomeId !== id);
        this.deletingIncomeId = null;
        this.hasChanged = true;
      },
      error: () => { this.deletingIncomeId = null; },
    });
  }

  close() {
    this.hasChanged ? this.modal.close('changed') : this.modal.dismiss();
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
