import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-security-info-modal',
  standalone: true,
  imports: [],
  templateUrl: './security-info-modal.component.html',
})
export class SecurityInfoModalComponent {
  readonly modal = inject(NgbActiveModal);
}
