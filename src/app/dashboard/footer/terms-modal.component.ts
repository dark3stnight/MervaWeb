import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-terms-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './terms-modal.component.html',
})
export class TermsModalComponent {
  readonly modal = inject(NgbActiveModal);
}
