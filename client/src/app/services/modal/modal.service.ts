import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject = new Subject<boolean>();
  showModal$ = this.showModalSubject.asObservable();

  isOpen = false;

  constructor() {}

  open() {
    if (!this.isOpen) {
      this.showModalSubject.next(true);
      this.isOpen = true;
    }
  }

  close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.showModalSubject.next(false);
    }
  }
}
