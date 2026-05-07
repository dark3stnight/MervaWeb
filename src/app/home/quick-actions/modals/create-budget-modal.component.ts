import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from '../../../user-expense/models/expense-currency';
import { Category } from '../../../user-expense/models/expense-category';

@Component({
  selector: 'app-create-budget-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-budget-modal.component.html',
})
export class CreateBudgetModalComponent {
  readonly modal = inject(NgbActiveModal);

  category: Category | '' = '';
  limit: number | null = null;
  currency = Currency.USD;
  period: 'monthly' | 'yearly' = 'monthly';

  readonly currencies = Object.values(Currency);
  readonly categories = Object.values(Category);
}
