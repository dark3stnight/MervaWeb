import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../services/token.service';
import { AppStateService } from '../../state/app-state.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

const TOKEN_KEY = 'merva_access_token';

@Component({
  selector: 'app-access-token',
  standalone: true,
  imports: [NgbTooltip, FormsModule, TranslatePipe],
  templateUrl: './access-token.component.html',
  styleUrl: './access-token.component.scss'
})
export class AccessTokenComponent {
  accessToken = '';
  copied = false;
  showInput = false;
  showConfirm = false;
  inputToken = '';
  tokenError = '';
  validating = false;

  private tokenService = inject(TokenService);
  private appState = inject(AppStateService);

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
    this.showConfirm = false;
    this.inputToken = '';
    this.tokenError = '';
  }

  eraseToken() {
    this.showConfirm = true;
    this.showInput = false;
  }

  confirmErase() {
    localStorage.removeItem(TOKEN_KEY);
    this.accessToken = '';
    this.showConfirm = false;
  }

  cancelErase() {
    this.showConfirm = false;
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
        this.tokenError = 'token.notFound';
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

  private async syncWithApi(token: string, isNew: boolean) {
    const browserData = await this.tokenService.collectBrowserData();
    this.tokenService.registerToken({ token, ...browserData }).subscribe({
      next: (response) => this.appState.setIsPremium(response.isPremium),
    });
  }
}
