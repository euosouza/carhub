import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Toast, ToastNotificationService } from '../../services/toast-notification/toast-notification.service';

export enum ToastNotificationTypes {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info"
}


@Component({
  selector: 'app-toast-notification-content',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './toast-notification-content.component.html',
  styleUrl: './toast-notification-content.component.scss'
})
export class ToastNotificationContentComponent {
  @ViewChild("toast", { read: ElementRef }) toastElement!: ElementRef;
  toasts: Toast[] = [];

  constructor(private toastService: ToastNotificationService, private render: Renderer2,) { }

  ngOnInit() {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  dismissToast(id: string) {
    setTimeout(() => {
      this.toastService.dismiss(id);
      this.render.removeClass(this.toastElement.nativeElement, "hide-toast-notification");
    }, 200);

  }
}
