import { Component, OnInit, inject, afterNextRender } from '@angular/core';
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
import { LanguageSelectorComponent } from '../../i18n/language-selector/language-selector.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AccessTokenComponent, AddExpenseComponent, StatsCardsComponent, ChartsComponent, RecentTransactionsComponent, QuickActionsComponent, SecurityBadgeComponent, TokenBannerComponent, FooterComponent, LanguageSelectorComponent, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  protected appState = inject(AppStateService);

  constructor() {
    afterNextRender(() => {
    setTimeout(() => {
      this.loadAds();
    }, 300);
  });
    // afterNextRender(() => {
    //   try {
    //     (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
    //       (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
    //     (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
    //     (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
    //   } catch {}
    // });
  }

  ngOnInit() {
    this.appState.initialize();
    this.homeService.getHome().subscribe(() => {});
  }

 private loadAds(): void {
  try {
    const w = window as unknown as { adsbygoogle: unknown[] };
    w.adsbygoogle = w.adsbygoogle || [];

    const ads = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])');

    ads.forEach(() => {
      w.adsbygoogle.push({});
    });
  } catch (error) {
    console.warn('AdSense load skipped:', error);
  }
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
