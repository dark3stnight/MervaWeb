import { Injectable, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AddExpenseResponse, ExpenseService } from '../user-expense/services/expense.service';
import { IncomeResponse, IncomeService } from '../user-income/services/income.service';
import { PreferenceService } from '../user-preference/services/preference.service';
import { Currency } from '../user-expense/models/expense-currency';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private expenseService = inject(ExpenseService);
  private incomeService = inject(IncomeService);
  private preferenceService = inject(PreferenceService);

  private _expenses = signal<AddExpenseResponse[]>([]);
  private _incomes = signal<IncomeResponse[]>([]);
  private _currency = signal<Currency | null>(null);
  private _loading = signal(false);

  readonly expenses = this._expenses.asReadonly();
  readonly incomes = this._incomes.asReadonly();
  readonly currency = this._currency.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly totalExpenses = computed(() => this._expenses().reduce((sum, e) => sum + e.amount, 0));
  readonly totalIncome = computed(() => this._incomes().reduce((sum, i) => sum + i.amount, 0));
  readonly netBalance = computed(() => this.totalIncome() - this.totalExpenses());
  readonly transactionCount = computed(() => this._expenses().length + this._incomes().length);

  loadCurrency() {
    this.preferenceService.getResolvedCurrency().subscribe(currency => {
      this._currency.set(currency);
    });
  }

  setCurrency(currency: Currency | null) {
    this._currency.set(currency);
  }

  loadAll() {
    this._loading.set(true);
    forkJoin({
      expenses: this.expenseService.getAll(),
      incomes: this.incomeService.getAll(),
    }).subscribe({
      next: ({ expenses, incomes }) => {
        this._expenses.set(expenses);
        this._incomes.set(incomes);
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }
}
