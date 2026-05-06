import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
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
import { ExpenseService, AddExpenseResponse } from '../../services/expense.service';

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
  imports: [NgApexchartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() refresh = 0;

  private expenseService = inject(ExpenseService);

  categories: { name: string; pct: number; amount: string; color: string }[] = [];

  // ── Area chart ────────────────────────────────────────────────────────────

  areaSeries: ApexAxisChartSeries = [{ name: 'Expenses', data: [] }];

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

  ngOnInit() {
    this.loadCharts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refresh'] && !changes['refresh'].firstChange) {
      this.loadCharts();
    }
  }

  private loadCharts() {
    this.expenseService.getAll().subscribe(expenses => {
      this.buildAreaChart(expenses);
      this.buildDonutChart(expenses);
    });
  }

  private buildAreaChart(expenses: AddExpenseResponse[]) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const thisMonth = expenses
      .filter(e => {
        const d = new Date(e.expenseDate);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .sort((a, b) => a.expenseDate.localeCompare(b.expenseDate));

    const labels = thisMonth.map(e => {
      const [y, m, day] = e.expenseDate.substring(0, 10).split('-').map(Number);
      return new Date(y, m - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const data = thisMonth.map(e => parseFloat(e.amount.toFixed(2)));

    this.areaSeries = [{ name: 'Expenses', data }];
    this.areaXAxis = { ...this.areaXAxis, categories: labels };
  }

  private buildDonutChart(expenses: AddExpenseResponse[]) {
    const byCategory = new Map<string, number>();
    for (const e of expenses) {
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
              label: 'Total',
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
