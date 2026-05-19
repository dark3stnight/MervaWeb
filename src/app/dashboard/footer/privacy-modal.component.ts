import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-privacy-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './privacy-modal.component.html',
})
export class PrivacyModalComponent {
  readonly modal = inject(NgbActiveModal);
}
