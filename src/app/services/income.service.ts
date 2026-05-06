import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IncomeResponse {
  incomeId: number;
  name: string;
  amount: number;
  currency: string;
  category: string | null;
  incomeDate: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/incomes`;

  getAll(): Observable<IncomeResponse[]> {
    return this.http.get<IncomeResponse[]>(this.baseUrl);
  }
}
