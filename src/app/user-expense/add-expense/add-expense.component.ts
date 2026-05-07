import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Currency } from '../models/expense-currency';
import { Category } from '../models/expense-category';
import { ExpenseService } from '../services/expense.service';
import { TokenService } from '../../user-token/services/token.service';

export { Currency, Category };

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule, NgbTypeahead],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  @Output() expenseAdded = new EventEmitter<void>();

  name = '';
  amount: number | null = null;
  currency: Currency = Currency.USD;
  category: Category | '' = '';

  submitting = false;
  error = '';

  readonly currencies = Object.values(Currency);
  readonly categories = Object.values(Category);

  currencyFocus$ = new Subject<string>();
  currencyClick$ = new Subject<string>();
  categoryFocus$ = new Subject<string>();
  categoryClick$ = new Subject<string>();

  @ViewChild('currencyTypeahead') currencyTypeahead!: NgbTypeahead;
  @ViewChild('categoryTypeahead') categoryTypeahead!: NgbTypeahead;

  private expenseService = inject(ExpenseService);
  private tokenService = inject(TokenService);

  searchCurrency: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(150), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.currencyClick$.pipe(
      filter(() => !this.currencyTypeahead.isPopupOpen()),
    );
    return merge(debouncedText$, this.currencyFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        this.currencies.filter(c => term === '' || c.toLowerCase().startsWith(term.toLowerCase())),
      ),
    );
  };

  searchCategory: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(150), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.categoryClick$.pipe(
      filter(() => !this.categoryTypeahead.isPopupOpen()),
    );
    return merge(debouncedText$, this.categoryFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        this.categories.filter(c => term === '' || c.toLowerCase().includes(term.toLowerCase())),
      ),
    );
  };

  submit() {
    const token = this.tokenService.getStoredToken();
    if (!token || !this.name.trim() || !this.amount) return;

    this.submitting = true;
    this.error = '';

    const today = new Date().toISOString().split('T')[0];

    this.expenseService.add({
      token,
      name: this.name.trim(),
      amount: Math.abs(this.amount),
      currency: this.currency || undefined,
      category: this.category || undefined,
      expenseDate: today,
    }).subscribe({
      next: () => {
        this.name = '';
        this.amount = null;
        this.currency = Currency.USD;
        this.category = '';
        this.submitting = false;
        this.expenseAdded.emit();
      },
      error: () => {
        this.error = 'Failed to add expense. Please try again.';
        this.submitting = false;
      },
    });
  }
}
