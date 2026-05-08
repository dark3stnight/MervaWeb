import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenExplainerModalComponent } from './token-explainer-modal.component';

@Component({
  selector: 'app-token-banner',
  standalone: true,
  imports: [],
  templateUrl: './token-banner.component.html',
  styleUrl: './token-banner.component.scss',
})
export class TokenBannerComponent {
  private modalService = inject(NgbModal);

  openExplainer() {
    this.modalService.open(TokenExplainerModalComponent, { centered: true });
  }
}
