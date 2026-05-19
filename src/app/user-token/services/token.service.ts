import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface RegisterTokenRequest {
  token: string;
  userAgent?: string;
  browser?: string;
  browserVersion?: string;
  operatingSystem?: string;
  language?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  connectionType?: string;
}

export interface UpdateTokenRequest {
  token: string;
  userAgent?: string;
  browser?: string;
  browserVersion?: string;
  operatingSystem?: string;
  language?: string;
  timezone?: string;
  connectionType?: string;
}

export interface UserBrowserData {
  userAgent?: string;
  browser?: string;
  browserVersion?: string;
  operatingSystem?: string;
  language?: string;
  timezone?: string;
  connectionType?: string;
  latitude?: number;
  longitude?: number;
}


export interface UserTokenResponse {
  tokenId: number;
  token: string;
  userAgent: string | null;
  browser: string | null;
  browserVersion: string | null;
  operatingSystem: string | null;
  language: string | null;
  timezone: string | null;
  ipAddress: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  isp: string | null;
  connectionType: string | null;
  isPremium: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class TokenService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/tokens`;
  private readonly TOKEN_KEY = 'merva_access_token';

  getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(token: string): Observable<UserTokenResponse> {
    return this.http.get<UserTokenResponse>(`${this.baseUrl}/${token}`);
  }

  validateToken(token: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/validate`, { token });
  }

  registerToken(request: RegisterTokenRequest): Observable<UserTokenResponse> {
    return this.http.post<UserTokenResponse>(`${this.baseUrl}/register`, request);
  }

  updateBrowserData(request: UpdateTokenRequest): Observable<UserTokenResponse> {
    return this.http.patch<UserTokenResponse>(this.baseUrl, request);
  }

  async collectBrowserData(): Promise<UserBrowserData> {
    const ua = navigator.userAgent;
    const { browser, browserVersion } = this.parseBrowser(ua);
    const conn = (navigator as any).connection;

    const data: UserBrowserData = {
      userAgent:      ua,
      browser,
      browserVersion,
      operatingSystem: this.parseOS(ua),
      language:        navigator.language,
      timezone:        Intl.DateTimeFormat().resolvedOptions().timeZone,
      connectionType:  conn?.effectiveType ?? conn?.type ?? undefined,
    };

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
      );
      data.latitude  = position.coords.latitude;
      data.longitude = position.coords.longitude;
    } catch {
      // geolocation unavailable or denied — proceed without it
    }

    return data;
  }

  private parseBrowser(ua: string): { browser: string; browserVersion: string } {
    const matchers: { name: string; pattern: RegExp }[] = [
      { name: 'Edge',    pattern: /Edg\/(\S+)/ },
      { name: 'Chrome',  pattern: /Chrome\/(\S+)/ },
      { name: 'Firefox', pattern: /Firefox\/(\S+)/ },
      { name: 'Safari',  pattern: /Version\/(\S+).*Safari/ },
    ];
    for (const { name, pattern } of matchers) {
      const match = ua.match(pattern);
      if (match) return { browser: name, browserVersion: match[1] };
    }
    return { browser: 'Unknown', browserVersion: '' };
  }

  private parseOS(ua: string): string {
    if (/Windows NT 10\.0/.test(ua)) return 'Windows 10/11';
    if (/Windows NT/.test(ua))       return 'Windows';
    if (/Mac OS X/.test(ua))         return 'macOS';
    if (/Android/.test(ua))          return 'Android';
    if (/iPhone|iPad/.test(ua))      return 'iOS';
    if (/Linux/.test(ua))            return 'Linux';
    return 'Unknown';
  }
}
