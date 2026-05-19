import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRecurringModalComponent } from '../../user-expense/recurring-modal/add-recurring-modal.component';
import { AddIncomeModalComponent } from '../../user-income/component/add-income-modal.component';
import { ManageTransactionsModalComponent } from '../../user-transactions/components/manage-transactions-modal.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss',
})
export class QuickActionsComponent {
  private modalService = inject(NgbModal);

  openAddIncome() {
    this.modalService.open(AddIncomeModalComponent, { centered: true });
  }

  openAddRecurring() {
    this.modalService.open(AddRecurringModalComponent, { centered: true, size: 'lg' });
  }

  openManageTransactions() {
    this.modalService.open(ManageTransactionsModalComponent, { centered: true, size: 'lg' });
  }
}
