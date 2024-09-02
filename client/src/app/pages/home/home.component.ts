import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CreateVehicleComponent } from '../../components/vehicle/create-vehicle/create-vehicle.component';
import { DeleteVehicleComponent } from '../../components/vehicle/delete-vehicle/delete-vehicle.component';
import { FindOneVehicleComponent } from '../../components/vehicle/find-one-vehicle/find-one-vehicle.component';
import { UpdateVehicleComponent } from '../../components/vehicle/update-vehicle/update-vehicle.component';
import { Vehicles } from '../../interfaces/Vehicles';
import { HttpClientService } from '../../services/http-client/http-client.service';
import { ModalService } from '../../services/modal/modal.service';
import { ToastNotificationService } from '../../services/toast-notification/toast-notification.service';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ModalComponent,
    CreateVehicleComponent,
    FindOneVehicleComponent,
    DeleteVehicleComponent,
    UpdateVehicleComponent,
    ButtonComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentModal: string = "";
  vehicles: Vehicles[] = [];
  vehicle: Vehicles = {} as Vehicles;

  private destroyRef = inject(DestroyRef);
  constructor(
    private modalService: ModalService,
    private vehiclesService: VehiclesService,
    private httpClientService: HttpClientService,
    private toastNotificationService: ToastNotificationService
  ) {
    this.vehiclesService.vehiclesSubject$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((vehicles) => {
      this.vehicles = vehicles;
    })
  }

  ngOnInit() {
    this.httpClientService.getAllVehicles()
    .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles.data;
          this.vehiclesService.set(this.vehicles)
        },
        error: (responseError: HttpErrorResponse) => {
          this.toastNotificationService.show({
            text: responseError.error.data,
            type: 'error'
          })
        }
      })
  }

  openModal(id: string) {
    this.currentModal = id;
    this.modalService.open();
  }

  closeModal() {
    this.modalService.close();
    this.vehicle = {} as Vehicles;
  }

  hadleClick(id: string, vehicle?: Vehicles) {
    if (vehicle) this.vehicle = vehicle;
    this.openModal(id)
  }
}
