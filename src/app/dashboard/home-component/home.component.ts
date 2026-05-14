import { Component, OnInit, inject } from '@angular/core';
import { AccessTokenComponent } from '../../user-token/component/access-token.component';
import { AddExpenseComponent } from '../../user-expense/add-expense/add-expense.component';
import { StatsCardsComponent } from '../../stats-cards/stats-cards.component';
import { ChartsComponent } from '../charts/charts.component';
import { RecentTransactionsComponent } from '../../user-expense/recent-transactions/recent-transactions.component';
import { QuickActionsComponent } from '../quick-actions/quick-actions.component';
import { SecurityBadgeComponent } from '../security-badge/security-badge.component';
import { TokenBannerComponent } from '../token-banner/token-banner.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeService } from '../services/home.service';
import { AppStateService } from '../../state/app-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AccessTokenComponent, AddExpenseComponent, StatsCardsComponent, ChartsComponent, RecentTransactionsComponent, QuickActionsComponent, SecurityBadgeComponent, TokenBannerComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  private appState = inject(AppStateService);

  ngOnInit() {
    this.homeService.getHome().subscribe(() => {});
    this.appState.loadCurrency();
    this.appState.loadAll();
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
