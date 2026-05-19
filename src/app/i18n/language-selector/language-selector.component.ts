import { Component, inject } from '@angular/core';
import { LanguageService } from '../language.service';
import { Language } from '../translations';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  protected langService = inject(LanguageService);

  setLang(lang: Language) {
    this.langService.setLanguage(lang);
  }
}
