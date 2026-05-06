import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';
import { AccessTokenComponent } from '../access-token/access-token.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { StatsCardsComponent } from '../stats-cards/stats-cards.component';
import { ChartsComponent } from './charts/charts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AccessTokenComponent, AddExpenseComponent, StatsCardsComponent, ChartsComponent],
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
    { label: 'Expenses', active: false },
    { label: 'Analytics', active: false },
    { label: 'Categories', active: false },
    { label: 'Budgets', active: false },
    { label: 'Recurring', active: false },
    { label: 'Export', active: false },
  ];

  transactions = [
    { name: 'Coffee',       date: 'May 31, 2024', category: 'Food & Dining',  amount: '-$4.50',  bg: '#FEE2E2', color: '#F87171' },
    { name: 'Uber',         date: 'May 30, 2024', category: 'Transport',      amount: '-$18.30', bg: '#DBEAFE', color: '#60A5FA' },
    { name: 'Supermarket',  date: 'May 30, 2024', category: 'Shopping',       amount: '-$63.45', bg: '#D1FAE5', color: '#34D399' },
    { name: 'Internet Bill',date: 'May 29, 2024', category: 'Bills',          amount: '-$45.00', bg: '#EDE9FE', color: '#A78BFA' },
    { name: 'Netflix',      date: 'May 28, 2024', category: 'Entertainment',  amount: '-$15.99', bg: '#FEE2E2', color: '#F87171' },
    { name: 'Fuel',         date: 'May 27, 2024', category: 'Transport',      amount: '-$51.20', bg: '#FEF3C7', color: '#FBBF24' },
  ];

  budgets = [
    { category: 'Food & Dining', spent: 479.80, total: 600,  pct: 80, color: '#F87171' },
    { category: 'Transport',     spent: 303.60, total: 400,  pct: 76, color: '#60A5FA' },
    { category: 'Shopping',      spent: 202.30, total: 300,  pct: 67, color: '#FBBF24' },
  ];
}
