import { Injectable, signal } from '@angular/core';
import { Language, TRANSLATIONS } from './translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'merva_language';
  private _lang = signal<Language>(this.loadInitial());

  readonly lang = this._lang.asReadonly();

  setLanguage(lang: Language) {
    this._lang.set(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  translate(key: string): string {
    return TRANSLATIONS[this._lang()][key] ?? key;
  }

  private loadInitial(): Language {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'es' ? 'es' : 'en';
  }
}
