import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Vehicles } from '../../../interfaces/Vehicles';
import { HttpClientService } from '../../../services/http-client/http-client.service';
import { ToastNotificationService } from '../../../services/toast-notification/toast-notification.service';
import { VehiclesService } from '../../../services/vehicles/vehicles.service';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-create-vehicle',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.scss'
})
export class CreateVehicleComponent {
  private formBuilderService = inject(UntypedFormBuilder);
  vehicle: Vehicles = {} as Vehicles;
  years: number[] = [];
  @Output() handleClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private vehiclesService: VehiclesService,
    private httpClientService: HttpClientService,
    private toastNotificationService: ToastNotificationService
  ) {
    this.generateYearRange();
  }

  form = this.formBuilderService.group({
    marca: [null, Validators.required],
    ano: [null, Validators.required],
    modelo: [null, Validators.required],
    placa: [null, Validators.required],
    chassi: [null, Validators.required],
    renavam: [null, Validators.required],
  })

  generateYearRange(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    for (let i = currentYear;  i >= startYear; i--) {
      this.years.push(i);
    }
  }

  onSubmit() {
    this.httpClientService.createVehicle(this.form.value)
      .subscribe({
        next: (response) => {
          this.vehicle = response.data
          this.vehiclesService.add(this.vehicle)

          this.toastNotificationService.show({
            text: "Veículo criado com sucesso!",
            type: 'success'
          })

          this.closeModal();
        },
        error: (responseError: HttpErrorResponse) => {
          this.toastNotificationService.show({
            text: responseError.error.data,
            type: 'error'
          })
        },
        complete: () => this.closeModal()
      })
  }

  closeModal() {
    this.form.reset();
    this.handleClick.emit();
  }
}
