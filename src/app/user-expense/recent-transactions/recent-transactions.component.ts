import { Component, computed, inject } from '@angular/core';
import { AddExpenseResponse } from '../services/expense.service';
import { AppStateService } from '../../state/app-state.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

interface Transaction {
  name: string;
  date: string;
  category: string;
  amount: string;
  bg: string;
  color: string;
}

const CATEGORY_STYLE: Record<string, { bg: string; color: string }> = {
  'Food & Dining': { bg: '#FEE2E2', color: '#F87171' },
  'Transport':     { bg: '#DBEAFE', color: '#60A5FA' },
  'Shopping':      { bg: '#D1FAE5', color: '#34D399' },
  'Bills':         { bg: '#EDE9FE', color: '#A78BFA' },
  'Entertainment': { bg: '#FEF3C7', color: '#F59E0B' },
  'Health':        { bg: '#D1FAE5', color: '#10B981' },
  'Education':     { bg: '#DBEAFE', color: '#3B82F6' },
  'Travel':        { bg: '#FEF3C7', color: '#FB923C' },
  'Subscriptions': { bg: '#F3E8FF', color: '#E879F9' },
  'Other':         { bg: '#F3F4F6', color: '#6B7280' },
};

const FALLBACK_STYLE = { bg: '#F3F4F6', color: '#6B7280' };

@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss'
})
export class RecentTransactionsComponent {
  private appState = inject(AppStateService);

  readonly transactions = computed<Transaction[]>(() =>
    this.appState.expenses().slice(0, 5).map(e => this.toTransaction(e))
  );

  private toTransaction(e: AddExpenseResponse): Transaction {
    const style = CATEGORY_STYLE[e.category ?? ''] ?? FALLBACK_STYLE;
    const [y, m, d] = e.expenseDate.substring(0, 10).split('-').map(Number);
    const date = new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const amount = `-${e.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
    return { name: e.name, date, category: e.category ?? 'Other', amount, ...style };
  }
}
