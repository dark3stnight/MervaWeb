import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRecurringModalComponent } from '../../user-expense/recurring-modal/add-recurring-modal.component';
import { AddIncomeModalComponent } from '../../user-income/component/add-income-modal.component';
import { ManageTransactionsModalComponent } from '../../user-transactions/components/manage-transactions-modal.component';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss',
})
export class QuickActionsComponent {
  @Output() dataChanged = new EventEmitter<void>();

  private modalService = inject(NgbModal);

  openAddIncome() {
    const ref = this.modalService.open(AddIncomeModalComponent, { centered: true });
    ref.closed.subscribe(result => {
      if (result === 'added') this.dataChanged.emit();
    });
  }

  openAddRecurring() {
    this.modalService.open(AddRecurringModalComponent, { centered: true, size: 'lg' });
  }

  openManageTransactions() {
    const ref = this.modalService.open(ManageTransactionsModalComponent, { centered: true, size: 'lg' });
    ref.closed.subscribe(result => {
      if (result === 'changed') this.dataChanged.emit();
    });
  }
}
