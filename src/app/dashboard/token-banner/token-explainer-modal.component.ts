import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-token-explainer-modal',
  standalone: true,
  imports: [],
  templateUrl: './token-explainer-modal.component.html',
})
export class TokenExplainerModalComponent {
  readonly modal = inject(NgbActiveModal);
}
