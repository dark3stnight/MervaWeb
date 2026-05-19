import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import type {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexFill,
  ApexDataLabels,
  ApexGrid,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexLegend,
} from 'ng-apexcharts';
import { AddExpenseResponse } from '../../user-expense/services/expense.service';
import { AppStateService } from '../../state/app-state.service';
import { LanguageService } from '../../i18n/language.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

type Period = 'week' | 'month' | 'quarter' | 'year';

const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining': '#F472B6',
  'Transport':     '#60A5FA',
  'Shopping':      '#FBBF24',
  'Bills':         '#A78BFA',
  'Entertainment': '#F87171',
  'Health':        '#34D399',
  'Education':     '#3B82F6',
  'Travel':        '#FB923C',
  'Subscriptions': '#E879F9',
  'Other':         '#6B7280',
};

const FALLBACK_COLORS = ['#F472B6', '#60A5FA', '#FBBF24', '#A78BFA', '#34D399', '#F87171', '#3B82F6', '#FB923C', '#E879F9', '#6B7280'];

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgApexchartsModule, TranslatePipe],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  private appState = inject(AppStateService);
  private langService = inject(LanguageService);

  readonly isPremium = this.appState.isPremium;
  readonly periods: readonly Period[] = ['week', 'month', 'quarter', 'year'];

  areaPeriod = signal<Period>('month');
  donutPeriod = signal<Period>('month');
  areaDropdownOpen = false;
  donutDropdownOpen = false;

  categories: { name: string; pct: number; amount: string; color: string }[] = [];

  // ── Area chart ────────────────────────────────────────────────────────────

  areaSeries: ApexAxisChartSeries = [{ name: '', data: [] }];

  areaChart: ApexChart = {
    type: 'area',
    height: 210,
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  areaXAxis: ApexXAxis = {
    categories: [],
    labels: { style: { colors: '#9CA3AF', fontSize: '10px' }, rotate: 0 },
    axisBorder: { show: false },
    axisTicks: { show: false },
    tickAmount: 4,
  };

  areaYAxis: ApexYAxis = {
    labels: {
      style: { colors: '#9CA3AF', fontSize: '10px' },
      formatter: (val: number) => `$${val}`,
    },
  };

  areaStroke: ApexStroke = { curve: 'smooth', width: 2 };

  areaFill: ApexFill = {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.18, opacityTo: 0.01, stops: [0, 100] },
  };

  areaDataLabels: ApexDataLabels = { enabled: false };

  areaColors = ['#7C3AED'];

  areaGrid: ApexGrid = {
    borderColor: '#E5E7EB',
    xaxis: { lines: { show: false } },
  };

  areaTooltip: ApexTooltip = {
    y: { formatter: (val: number) => `$${val.toFixed(2)}` },
  };

  // ── Donut chart ───────────────────────────────────────────────────────────

  donutSeries: ApexNonAxisChartSeries = [];

  donutChart: ApexChart = {
    type: 'donut',
    height: 210,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  donutColors: string[] = [];

  donutLabels: string[] = [];

  donutPlotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#9CA3AF',
            fontSize: '10px',
            formatter: () => '$0.00',
          },
          value: { color: '#111827', fontSize: '14px', fontWeight: '700' },
          name: { color: '#9CA3AF', fontSize: '10px' },
        },
      },
    },
  };

  donutDataLabels: ApexDataLabels = { enabled: false };

  donutLegend: ApexLegend = { show: false };

  donutTooltip: ApexTooltip = {
    y: { formatter: (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) },
  };

  constructor() {
    effect(() => {
      const expenses = this.appState.expenses();
      this.buildAreaChart(expenses, this.areaPeriod());
      this.buildDonutChart(expenses, this.donutPeriod());
    });
  }

  @HostListener('document:click')
  closeDropdowns(): void {
    this.areaDropdownOpen = false;
    this.donutDropdownOpen = false;
  }

  toggleAreaDropdown(event: Event): void {
    event.stopPropagation();
    this.areaDropdownOpen = !this.areaDropdownOpen;
    this.donutDropdownOpen = false;
  }

  toggleDonutDropdown(event: Event): void {
    event.stopPropagation();
    this.donutDropdownOpen = !this.donutDropdownOpen;
    this.areaDropdownOpen = false;
  }

  selectAreaPeriod(event: Event, period: Period): void {
    event.stopPropagation();
    if (period === 'year' && !this.appState.isPremium()) return;
    this.areaPeriod.set(period);
    this.areaDropdownOpen = false;
  }

  selectDonutPeriod(event: Event, period: Period): void {
    event.stopPropagation();
    if (period === 'year' && !this.appState.isPremium()) return;
    this.donutPeriod.set(period);
    this.donutDropdownOpen = false;
  }

  private getPeriodStart(period: Period): Date {
    const now = new Date();
    switch (period) {
      case 'week':    return new Date(now.getTime() -   7 * 24 * 60 * 60 * 1000);
      case 'month':   return new Date(now.getTime() -  30 * 24 * 60 * 60 * 1000);
      case 'quarter': return new Date(now.getTime() -  90 * 24 * 60 * 60 * 1000);
      case 'year':    return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    }
  }

  private buildAreaChart(expenses: AddExpenseResponse[], period: Period): void {
    const from = this.getPeriodStart(period);

    const filtered = expenses.filter(e => {
      const [y, m, d] = e.expenseDate.substring(0, 10).split('-').map(Number);
      return new Date(y, m - 1, d) >= from;
    });

    if (period === 'year') {
      const byMonth = new Map<string, number>();
      for (const e of filtered) {
        const key = e.expenseDate.substring(0, 7);
        byMonth.set(key, (byMonth.get(key) ?? 0) + e.amount);
      }
      const sorted = Array.from(byMonth.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      const labels = sorted.map(([key]) => {
        const [y, m] = key.split('-').map(Number);
        return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      });
      const data = sorted.map(([, amt]) => parseFloat(amt.toFixed(2)));
      this.areaSeries = [{ name: this.langService.translate('chart.expenses'), data }];
      this.areaXAxis = { ...this.areaXAxis, categories: labels };
    } else {
      const byDay = new Map<string, number>();
      for (const e of filtered) {
        const key = e.expenseDate.substring(0, 10);
        byDay.set(key, (byDay.get(key) ?? 0) + e.amount);
      }
      const sorted = Array.from(byDay.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      const labels = sorted.map(([key]) => {
        const [y, m, d] = key.split('-').map(Number);
        return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
      const data = sorted.map(([, amt]) => parseFloat(amt.toFixed(2)));
      this.areaSeries = [{ name: this.langService.translate('chart.expenses'), data }];
      this.areaXAxis = { ...this.areaXAxis, categories: labels };
    }
  }

  private buildDonutChart(expenses: AddExpenseResponse[], period: Period): void {
    const from = this.getPeriodStart(period);

    const filtered = expenses.filter(e => {
      const [y, m, d] = e.expenseDate.substring(0, 10).split('-').map(Number);
      return new Date(y, m - 1, d) >= from;
    });

    const byCategory = new Map<string, number>();
    for (const e of filtered) {
      const cat = e.category ?? 'Other';
      byCategory.set(cat, (byCategory.get(cat) ?? 0) + e.amount);
    }

    const total = Array.from(byCategory.values()).reduce((sum, v) => sum + v, 0);
    const sorted = Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1]);

    const labels = sorted.map(([name]) => name);
    const amounts = sorted.map(([, amt]) => amt);
    const colors = labels.map((name, i) => CATEGORY_COLORS[name] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length]);

    this.categories = sorted.map(([name, amt], i) => ({
      name,
      pct: total > 0 ? Math.round((amt / total) * 100) : 0,
      amount: amt.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      color: colors[i],
    }));

    this.donutSeries = amounts.map(a => parseFloat(a.toFixed(2)));
    this.donutLabels = labels;
    this.donutColors = colors;
    this.donutPlotOptions = {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: this.langService.translate('chart.total'),
              color: '#9CA3AF',
              fontSize: '10px',
              formatter: () => total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            },
            value: { color: '#111827', fontSize: '14px', fontWeight: '700' },
            name: { color: '#9CA3AF', fontSize: '10px' },
          },
        },
      },
    };
  }
}
