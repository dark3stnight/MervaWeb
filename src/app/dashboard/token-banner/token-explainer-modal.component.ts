import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-token-explainer-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './token-explainer-modal.component.html',
})
export class TokenExplainerModalComponent {
  readonly modal = inject(NgbActiveModal);
}
