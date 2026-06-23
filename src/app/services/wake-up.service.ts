import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WakeUpService {
  private http = inject(HttpClient);

  readonly ready$ = this.http.get(`${environment.apiUrl}/health`).pipe(
    catchError(() => of(null)),
    shareReplay(1)
  );

  constructor() {
    this.ready$.subscribe();
  }
}
