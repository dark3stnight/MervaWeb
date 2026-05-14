import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Currency } from '../../user-expense/models/expense-currency';
import { PreferenceKeys } from '../preference-keys';

export interface PreferenceResponse {
  defaultCurrency: string;
}

@Injectable({ providedIn: 'root' })
export class PreferenceService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/preferences`;
  private readonly validCurrencies = new Set(Object.values(Currency));

  getDefaultCurrency(): Observable<PreferenceResponse | null> {
    return this.http.get<PreferenceResponse>(this.baseUrl).pipe(
      catchError(() => of(null)),
    );
  }

  getResolvedCurrency(): Observable<Currency | null> {
    return this.getDefaultCurrency().pipe(
      map(response => {
        if (response?.defaultCurrency && this.validCurrencies.has(response.defaultCurrency as Currency)) {
          return response.defaultCurrency as Currency;
        }
        const saved = localStorage.getItem(PreferenceKeys.FAVORITE_CURRENCY);
        if (saved && this.validCurrencies.has(saved as Currency)) {
          return saved as Currency;
        }
        return null;
      }),
    );
  }
}
