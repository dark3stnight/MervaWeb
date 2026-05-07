import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ExpenseService } from '../user-expense/services/expense.service';
import { IncomeService } from '../user-income/services/income.service';

interface StatCard {
  label: string;
  value: string;
  change: string;
  up: boolean;
  colorClass: string;
}

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.scss',
})
export class StatsCardsComponent implements OnInit, OnChanges {
  @Input() refresh = 0;

  private expenseService = inject(ExpenseService);
  private incomeService = inject(IncomeService);

  stats: StatCard[] = [
    { label: 'Total Expenses', value: '$0.00', change: '', up: false, colorClass: 'purple' },
    { label: 'Total Income',   value: '$0.00', change: '', up: true,  colorClass: 'green'  },
    { label: 'Net Balance',    value: '$0.00', change: '', up: true,  colorClass: 'blue'   },
    { label: 'Transactions',   value: '0',     change: '', up: true,  colorClass: 'orange' },
  ];

  ngOnInit() {
    this.loadStats();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refresh'] && !changes['refresh'].firstChange) {
      this.loadStats();
    }
  }

  private loadStats() {
    forkJoin({
      expenses: this.expenseService.getAll(),
      incomes:  this.incomeService.getAll(),
    }).subscribe(({ expenses, incomes }) => {
      const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
      const totalIncome   = incomes.reduce((sum, i)  => sum + i.amount, 0);
      const netBalance    = totalIncome - totalExpenses;

      this.stats[0].value = this.formatCurrency(totalExpenses);
      this.stats[1].value = this.formatCurrency(totalIncome);
      this.stats[2].value = this.formatCurrency(netBalance);
      this.stats[2].up    = netBalance >= 0;
      this.stats[3].value = (expenses.length + incomes.length).toString();
    });
  }

  private formatCurrency(value: number): string {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}
