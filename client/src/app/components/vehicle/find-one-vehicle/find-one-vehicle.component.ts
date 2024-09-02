import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Vehicles } from '../../../interfaces/Vehicles';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-find-one-vehicle',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './find-one-vehicle.component.html',
  styleUrl: './find-one-vehicle.component.scss'
})
export class FindOneVehicleComponent {
  @Input() vehicle!: Vehicles;
  @Output() handleClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  closeModal() {
    this.handleClick.emit()
  }
}
