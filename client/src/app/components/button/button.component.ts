import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variation: 'primary' | 'secondary' | "default-outline" | "danger" = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  get buttonClass(): string {
    return `btn ${this.variation} ${this.loading ? 'loading' : ''}`;
  }
}
