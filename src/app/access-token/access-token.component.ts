import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../services/token.service';

const TOKEN_KEY = 'merva_access_token';

@Component({
  selector: 'app-access-token',
  standalone: true,
  imports: [NgbTooltip, FormsModule],
  templateUrl: './access-token.component.html',
  styleUrl: './access-token.component.scss'
})
export class AccessTokenComponent {
  accessToken = '';
  copied = false;
  showInput = false;
  inputToken = '';
  tokenError = '';
  validating = false;

  private tokenService = inject(TokenService);

  ngOnInit() {
    const stored = localStorage.getItem(TOKEN_KEY);
    this.accessToken = stored ?? this.createAndStoreToken();
    this.syncWithApi(this.accessToken, !stored);
  }

  copyToken() {
    navigator.clipboard.writeText(this.accessToken).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }

  toggleInput() {
    this.showInput = !this.showInput;
    this.inputToken = '';
    this.tokenError = '';
  }

  submitToken() {
    const token = this.inputToken.trim();
    if (!token) return;

    this.validating = true;
    this.tokenError = '';

    this.tokenService.validateToken(token).subscribe({
      next: () => {
        localStorage.setItem(TOKEN_KEY, token);
        this.accessToken = token;
        this.showInput = false;
        this.inputToken = '';
        this.validating = false;
        this.syncWithApi(token, false);
      },
      error: () => {
        this.tokenError = 'Token not found. Please check and try again.';
        this.validating = false;
      },
    });
  }

  private createAndStoreToken(): string {
    const seg = () =>
      Math.random().toString(36).substring(2, 6).toUpperCase();
    const token = `${seg()}-${seg()}-${seg()}`;
    localStorage.setItem(TOKEN_KEY, token);
    return token;
  }

  private syncWithApi(token: string, isNew: boolean) {
    const browserData = this.tokenService.collectBrowserData();    
      this.tokenService.registerToken({ token, ...browserData }).subscribe();
      return;    
  }
}
