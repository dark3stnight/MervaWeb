import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddIncomeModalComponent } from './modals/add-income-modal.component';
import { AddRecurringModalComponent } from './modals/add-recurring-modal.component';
import { CreateBudgetModalComponent } from './modals/create-budget-modal.component';
import { ExportDataModalComponent } from './modals/export-data-modal.component';

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

  openCreateBudget() {
    this.modalService.open(CreateBudgetModalComponent, { centered: true });
  }

  openExportData() {
    this.modalService.open(ExportDataModalComponent, { centered: true });
  }
}
