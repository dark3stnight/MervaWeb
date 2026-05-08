import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { IncomeService } from '../services/income.service';
import { TokenService } from '../../user-token/services/token.service';
import { Currency } from '../../user-expense/models/expense-currency';
import { IncomeCategory } from '../models/income-category';

@Component({
  selector: 'app-add-income-modal',
  standalone: true,
  imports: [FormsModule, NgbTypeahead],
  templateUrl: './add-income-modal.component.html',
})
export class AddIncomeModalComponent {
  readonly modal = inject(NgbActiveModal);
  private incomeService = inject(IncomeService);
  private tokenService = inject(TokenService);

  name = '';
  amount: number | null = null;
  currency = Currency.USD;
  category: IncomeCategory | '' = '';
  incomeDate = new Date().toISOString().split('T')[0];
  submitting = false;
  error = '';

  readonly currencies = Object.values(Currency);
  readonly categories = Object.values(IncomeCategory);

  currencyFocus$ = new Subject<string>();
  currencyClick$ = new Subject<string>();
  @ViewChild('currencyTypeahead') currencyTypeahead!: NgbTypeahead;

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

  submit() {
    const token = this.tokenService.getStoredToken();
    if (!token || !this.name.trim() || !this.amount) return;
    this.submitting = true;
    this.error = '';
    this.incomeService.add({
      token,
      name: this.name.trim(),
      amount: Math.abs(this.amount),
      currency: this.currency || undefined,
      category: this.category || undefined,
      incomeDate: this.incomeDate,
    }).subscribe({
      next: () => this.modal.close('added'),
      error: () => {
        this.error = 'Failed to add income. Please try again.';
        this.submitting = false;
      },
    });
  }
}
