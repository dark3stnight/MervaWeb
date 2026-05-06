import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { AccessTokenComponent } from '../access-token/access-token.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { ChartsComponent } from './charts/charts.component';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { QuickActionsComponent } from './quick-actions/quick-actions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AccessTokenComponent, AddExpenseComponent, StatsCardsComponent, ChartsComponent, RecentTransactionsComponent, QuickActionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private homeservice: HomeService) {}

  refreshTrigger = 0;

  ngOnInit() {
    this.homeservice.getHome().subscribe(() => {});
  }

  onExpenseAdded() {
    this.refreshTrigger++;
  }

  navItems = [
    { label: 'Dashboard', active: true },
    // { label: 'Expenses', active: false },
    // { label: 'Analytics', active: false },
    // { label: 'Categories', active: false },
    // { label: 'Budgets', active: false },
    // { label: 'Recurring', active: false },
    // { label: 'Export', active: false },
  ];
}
