import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Vehicles } from '../../../interfaces/Vehicles';
import { HttpClientService } from '../../../services/http-client/http-client.service';
import { ToastNotificationService } from '../../../services/toast-notification/toast-notification.service';
import { VehiclesService } from '../../../services/vehicles/vehicles.service';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-delete-vehicle',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './delete-vehicle.component.html',
  styleUrl: './delete-vehicle.component.scss'
})
export class DeleteVehicleComponent implements OnInit {
  @Input() vehicle!: Vehicles;
  @Output() handleClick: EventEmitter<void> = new EventEmitter<void>();

  private formBuilderService = inject(UntypedFormBuilder);

  constructor(
    private vehiclesService: VehiclesService,
    private httpClientService: HttpClientService,
    private toastNotificationService: ToastNotificationService
  ) { }

  form = this.formBuilderService.group({
    id: ['', Validators.required],
    marca: ['', Validators.required],
    ano: ['', Validators.required],
    modelo: ['', Validators.required],
    placa: ['', Validators.required],
    chassi: ['', Validators.required],
    renavam: ['', Validators.required],
  })

  ngOnInit() {
    this.form.setValue({
      id: this.vehicle.id,
      marca: this.vehicle.marca,
      ano: this.vehicle.ano,
      modelo: this.vehicle.modelo,
      placa: this.vehicle.placa,
      chassi: this.vehicle.chassi,
      renavam: this.vehicle.renavam,
    })
  }

  onSubmit() {
    this.httpClientService.deleteVehicle(this.vehicle.id)
      .subscribe({
        next: (response) => {
          this.vehicle = response.data
          const updatedVehicles = this.vehiclesService.get().value
            .filter(vehicle => vehicle.id !== this.vehicle.id);

          this.vehiclesService.set(updatedVehicles);

          this.toastNotificationService.show({
            text: "Veículo deletado com sucesso!",
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
