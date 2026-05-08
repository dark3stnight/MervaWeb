import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivacyModalComponent } from './privacy-modal.component';
import { TermsModalComponent } from './terms-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private modalService = inject(NgbModal);

  openPrivacy() {
    this.modalService.open(PrivacyModalComponent, { centered: true });
  }

  openTerms() {
    this.modalService.open(TermsModalComponent, { centered: true });
  }
}
