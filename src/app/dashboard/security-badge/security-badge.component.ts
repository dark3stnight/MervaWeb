import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecurityInfoModalComponent } from './security-info-modal.component';

@Component({
  selector: 'app-security-badge',
  standalone: true,
  imports: [],
  templateUrl: './security-badge.component.html',
  styleUrl: './security-badge.component.scss',
})
export class SecurityBadgeComponent {
  private modalService = inject(NgbModal);

  openLearnMore() {
    this.modalService.open(SecurityInfoModalComponent, { centered: true });
  }
}
