import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, of } from 'rxjs';
import { ExpenseService, AddExpenseResponse } from '../../../user-expense/services/expense.service';
import { IncomeService, IncomeResponse } from '../../../user-income/services/income.service';

@Component({
  selector: 'app-export-data-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './export-data-modal.component.html',
})
export class ExportDataModalComponent {
  readonly modal = inject(NgbActiveModal);
  private expenseService = inject(ExpenseService);
  private incomeService = inject(IncomeService);

  format: 'csv' | 'json' = 'csv';
  dataType: 'expenses' | 'incomes' | 'all' = 'all';
  exporting = false;
  error = '';

  export() {
    this.exporting = true;
    this.error = '';

    const expenses$ = this.dataType !== 'incomes'
      ? this.expenseService.getAll()
      : of([] as AddExpenseResponse[]);
    const incomes$ = this.dataType !== 'expenses'
      ? this.incomeService.getAll()
      : of([] as IncomeResponse[]);

    forkJoin([expenses$, incomes$]).subscribe({
      next: ([expenses, incomes]) => {
        this.format === 'json'
          ? this.downloadJson({ expenses, incomes })
          : this.downloadCsv(expenses, incomes);
        this.exporting = false;
        this.modal.close();
      },
      error: () => {
        this.error = 'Failed to fetch data. Please try again.';
        this.exporting = false;
      },
    });
  }

  private downloadJson(data: object) {
    this.triggerDownload(
      new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
      `merva-export-${this.today()}.json`,
    );
  }

  private downloadCsv(expenses: AddExpenseResponse[], incomes: IncomeResponse[]) {
    const lines: string[] = [];
    if (expenses.length) {
      lines.push('--- EXPENSES ---');
      lines.push('Date,Name,Amount,Currency,Category');
      expenses.forEach(e =>
        lines.push(`${e.expenseDate},${this.csvEscape(e.name)},${e.amount},${e.currency},${e.category ?? ''}`),
      );
    }
    if (incomes.length) {
      if (lines.length) lines.push('');
      lines.push('--- INCOMES ---');
      lines.push('Date,Name,Amount,Currency,Category');
      incomes.forEach(i =>
        lines.push(`${i.incomeDate},${this.csvEscape(i.name)},${i.amount},${i.currency},${i.category ?? ''}`),
      );
    }
    this.triggerDownload(
      new Blob([lines.join('\n')], { type: 'text/csv' }),
      `merva-export-${this.today()}.csv`,
    );
  }

  private triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private csvEscape(value: string): string {
    return value.includes(',') || value.includes('"')
      ? `"${value.replace(/"/g, '""')}"`
      : value;
  }

  private today(): string {
    return new Date().toISOString().split('T')[0];
  }
}
