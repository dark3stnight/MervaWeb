import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-privacy-modal',
  standalone: true,
  imports: [],
  templateUrl: './privacy-modal.component.html',
})
export class PrivacyModalComponent {
  readonly modal = inject(NgbActiveModal);
}
