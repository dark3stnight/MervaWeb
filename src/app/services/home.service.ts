import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface HomeResponse {
  message: string;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class HomeService {
  private http = inject(HttpClient);

  getHome(): Observable<HomeResponse> {
    return this.http.get<HomeResponse>(`${environment.apiUrl}/home`);
  }
}
