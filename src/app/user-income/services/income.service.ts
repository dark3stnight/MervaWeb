import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AddIncomeRequest {
  token: string;
  name: string;
  amount: number;
  currency?: string;
  category?: string;
  incomeDate: string;
}

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

  add(request: AddIncomeRequest): Observable<IncomeResponse> {
    return this.http.post<IncomeResponse>(this.baseUrl, request);
  }

  getAll(): Observable<IncomeResponse[]> {
    return this.http.get<IncomeResponse[]>(this.baseUrl);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
