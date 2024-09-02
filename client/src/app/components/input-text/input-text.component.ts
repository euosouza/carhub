import { NgClass, NgIf } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Input() success: boolean = false;

  get inputClass(): string {
    if (this.error) return 'error';
    if (this.success) return 'success';
    return 'normal';
  }
}
