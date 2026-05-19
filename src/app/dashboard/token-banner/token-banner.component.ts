import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenExplainerModalComponent } from './token-explainer-modal.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-token-banner',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './token-banner.component.html',
  styleUrl: './token-banner.component.scss',
})
export class TokenBannerComponent {
  private modalService = inject(NgbModal);

  openExplainer() {
    this.modalService.open(TokenExplainerModalComponent, { centered: true });
  }
}
