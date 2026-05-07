import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AddExpenseRequest {
  token: string;
  name: string;
  amount: number;
  currency?: string;
  category?: string;
  expenseDate: string;
}

export interface AddExpenseResponse {
  expenseId: number;
  name: string;
  amount: number;
  currency: string;
  category: string | null;
  expenseDate: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/expenses`;

  add(request: AddExpenseRequest): Observable<AddExpenseResponse> {
    return this.http.post<AddExpenseResponse>(this.baseUrl, request);
  }

  getAll(): Observable<AddExpenseResponse[]> {
    return this.http.get<AddExpenseResponse[]>(this.baseUrl);
  }
}
