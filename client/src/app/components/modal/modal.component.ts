import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  showModal: boolean = false;

  private destroyRef = inject(DestroyRef);

  constructor(private modalService: ModalService) {
    this.modalService.showModal$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((show) =>
        this.showModal = show
      );
  }

  ngOnChanges(): void {
    this.modalService.showModal$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((show) => this.showModal = show);
  }

  closeModal() {
    this.modalService.close();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.modalService.close();
    }
  }
}
