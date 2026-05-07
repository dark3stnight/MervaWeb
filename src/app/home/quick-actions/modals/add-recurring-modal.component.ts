import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../../user-expense/models/expense-currency';
import { Category } from '../../../user-expense/models/expense-category';

@Component({
  selector: 'app-add-recurring-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-recurring-modal.component.html',
})
export class AddRecurringModalComponent {
  readonly modal = inject(NgbActiveModal);

  name = '';
  amount: number | null = null;
  currency = Currency.USD;
  category: Category | '' = '';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly';
  startDate = new Date().toISOString().split('T')[0];
  endDate = '';

  readonly currencies = Object.values(Currency);
  readonly categories = Object.values(Category);
}
