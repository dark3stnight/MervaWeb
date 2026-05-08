import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terms-modal',
  standalone: true,
  imports: [],
  templateUrl: './terms-modal.component.html',
})
export class TermsModalComponent {
  readonly modal = inject(NgbActiveModal);
}
