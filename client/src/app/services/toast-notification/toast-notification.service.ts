import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ToastNotificationTypes{
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info"
}

export interface Toast {
  id?: string;
  show: boolean;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  constructor() { }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  show({ type , title, text, }: Omit<Toast, "id" | "show">) {
    const id = this.generateId();
    const toastTemp: Toast = { id, type, title, text, show: true };

    this.toastsSubject.next([...this.toastsSubject.value, toastTemp]);

    if (3000 > 0) {
      setTimeout(() => this.dismiss(id), 3000);
    }
  }

  dismiss(id: string) {
    const toastMap = this.toastsSubject.value.map((toast: Toast) => {
      if(toast.id === id) toast.show = false
      return toast
    })

    this.toastsSubject.next(toastMap);
      setTimeout(() => {
        this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
      }, 50);
  }
}
