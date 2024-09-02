import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Vehicles } from '../../../interfaces/Vehicles';
import { HttpClientService } from '../../../services/http-client/http-client.service';
import { ToastNotificationService } from '../../../services/toast-notification/toast-notification.service';
import { VehiclesService } from '../../../services/vehicles/vehicles.service';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-update-vehicle',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './update-vehicle.component.html',
  styleUrl: './update-vehicle.component.scss'
})
export class UpdateVehicleComponent implements OnInit, OnChanges {
  @Input() vehicle!: Vehicles;
  @Output() handleClick: EventEmitter<void> = new EventEmitter<void>();
  years: number[] = [];

  private destroyRef = inject(DestroyRef);
  private formBuilderService = inject(UntypedFormBuilder);

  constructor(
    private vehiclesService: VehiclesService,
    private httpClientService: HttpClientService,
    private toastNotificationService: ToastNotificationService
  ) {
    this.generateYearRange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicle'] && this.vehicle) {
      this.form.patchValue(this.vehicle)
    }
    // if (changes['vehicle'] && this.vehicle) {
    //   const { ano, chassi, marca, modelo, placa, renavam } = this.vehicle;
    //   this.form.setValue({
    //     chassi,
    //     marca,
    //     modelo,
    //     ano,
    //     placa,
    //     renavam
    //   })
    // }
  }

  form = this.formBuilderService.group({
    id: ['', Validators.required],
    marca: ['', Validators.required],
    ano: ['', Validators.required],
    modelo: ['', Validators.required],
    placa: ['', Validators.required],
    chassi: ['', Validators.required],
    renavam: ['', Validators.required],
    createdAt: ['', Validators.required],
    updateddAt: ['', Validators.required],
  })

  ngOnInit() {
    if (this.vehicle) {
      this.form.patchValue(this.vehicle)
    }
  }

  onSubmit() {
    this.httpClientService.updateVehicle({ ...this.form.value, id: this.vehicle.id })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const updatedVehicles = this.vehiclesService.get().value
            .filter(vehicle => vehicle.id !== this.vehicle.id);

          this.vehiclesService.set(updatedVehicles)
          this.vehiclesService.add(response.data)

          this.toastNotificationService.show({
            text: "Veículo editado com sucesso!",
            type: 'success'
          })

          this.form.reset();
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

  generateYearRange(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    for (let i = currentYear; i >= startYear; i--) {
      this.years.push(i);
    }
  }
}
