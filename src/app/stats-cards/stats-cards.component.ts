import { Component, computed, inject } from '@angular/core';
import { AppStateService } from '../state/app-state.service';
import { TranslatePipe } from '../i18n/translate.pipe';

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
  imports: [TranslatePipe],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.scss',
})
export class StatsCardsComponent {
  private appState = inject(AppStateService);

  readonly stats = computed<StatCard[]>(() => {
    const totalExp = this.appState.totalExpenses();
    const totalInc = this.appState.totalIncome();
    const net = this.appState.netBalance();
    const count = this.appState.transactionCount();
    return [
      { label: 'stats.totalExpenses', value: this.fmt(totalExp), change: '', up: false,    colorClass: 'purple' },
      { label: 'stats.totalIncome',   value: this.fmt(totalInc), change: '', up: true,     colorClass: 'green'  },
      { label: 'stats.netBalance',    value: this.fmt(net),      change: '', up: net >= 0, colorClass: 'blue'   },
      { label: 'stats.transactions',  value: count.toString(),   change: '', up: true,     colorClass: 'orange' },
    ];
  });

  private fmt(value: number): string {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
}
