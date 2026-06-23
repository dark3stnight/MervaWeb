import { Component, ViewChild, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Currency } from '../models/expense-currency';
import { Category } from '../models/expense-category';
import { ExpenseService } from '../services/expense.service';
import { TokenService } from '../../user-token/services/token.service';
import { PreferenceKeys } from '../../user-preference/preference-keys';
import { AppStateService } from '../../state/app-state.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { LanguageService } from '../../i18n/language.service';

export { Currency, Category };

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule, NgbTypeahead, TranslatePipe],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  private expenseService = inject(ExpenseService);
  private tokenService = inject(TokenService);
  private appState = inject(AppStateService);
  private langService = inject(LanguageService);

  name = '';
  amount: number | null = null;
  currency: Currency = Currency.USD;
  category: Category | '' = '';
  expenseDate: string = this.today();
  favoriteCurrency = false;

  submitting = false;
  error = '';

  private resetCurrency: Currency = Currency.USD;
  private _currencyApplied = false;

  readonly currencies = Object.values(Currency);
  readonly categories = Object.values(Category);

  currencyFocus$ = new Subject<string>();
  currencyClick$ = new Subject<string>();
  categoryFocus$ = new Subject<string>();
  categoryClick$ = new Subject<string>();

  @ViewChild('currencyTypeahead') currencyTypeahead!: NgbTypeahead;
  @ViewChild('categoryTypeahead') categoryTypeahead!: NgbTypeahead;

  constructor() {
    effect(() => {
      const pref = this.appState.currency();
      if (pref && !this._currencyApplied) {
        this._currencyApplied = true;
        this.resetCurrency = pref;
        this.favoriteCurrency = true;
        this.currency = pref;
      }
    });
  }

  onFavoriteCurrencyChange(checked: boolean) {
    this.favoriteCurrency = checked;
    if (checked) {
      this.resetCurrency = this.currency;
      localStorage.setItem(PreferenceKeys.FAVORITE_CURRENCY, this.currency);
    } else {
      this.resetCurrency = Currency.USD;
      localStorage.removeItem(PreferenceKeys.FAVORITE_CURRENCY);
    }
  }

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

  readonly categoryInputFormatter = (cat: Category | '') =>
    cat ? this.langService.translate('category.' + cat) : '';

  readonly categoryResultFormatter = (cat: Category) =>
    this.langService.translate('category.' + cat);

  searchCategory: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(150), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.categoryClick$.pipe(
      filter(() => !this.categoryTypeahead.isPopupOpen()),
    );
    return merge(debouncedText$, this.categoryFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        this.categories.filter(c =>
          term === '' ||
          this.langService.translate('category.' + c).toLowerCase().includes(term.toLowerCase()),
        ),
      ),
    );
  };

  submit() {
    const token = this.tokenService.getStoredToken();
    if (!token || !this.name.trim() || !this.amount) return;

    this.submitting = true;
    this.error = '';

    this.expenseService.add({
      token,
      name: this.name.trim(),
      amount: Math.abs(this.amount),
      currency: this.currency || undefined,
      category: this.category || undefined,
      expenseDate: this.expenseDate || this.today(),
      favoriteCurrency: this.favoriteCurrency ? this.currency : undefined,
    }).subscribe({
      next: () => {
        this.name = '';
        this.amount = null;
        this.currency = this.resetCurrency;
        this.category = '';
        this.expenseDate = this.today();
        this.submitting = false;
        this.appState.loadAll();
      },
      error: () => {
        this.error = 'expense.error';
        this.submitting = false;
      },
    });
  }

  private today(): string {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }
}
