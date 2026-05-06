import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { ExpenseService, AddExpenseResponse } from '../../services/expense.service';

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
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss'
})
export class RecentTransactionsComponent implements OnInit, OnChanges {
  @Input() refresh = 0;

  private expenseService = inject(ExpenseService);

  transactions: Transaction[] = [];

  ngOnInit() {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refresh'] && !changes['refresh'].firstChange) {
      this.load();
    }
  }

  private load() {
    this.expenseService.getAll().subscribe(expenses => {
      this.transactions = expenses.slice(0, 6).map(e => this.toTransaction(e));
    });
  }

  private toTransaction(e: AddExpenseResponse): Transaction {
    const style = CATEGORY_STYLE[e.category ?? ''] ?? FALLBACK_STYLE;
    const [y, m, d] = e.createdAt.substring(0, 10).split('-').map(Number);
    const date = new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const amount = `-${e.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
    return { name: e.name, date, category: e.category ?? 'Other', amount, ...style };
  }
}
