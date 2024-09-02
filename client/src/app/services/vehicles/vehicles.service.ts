import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Vehicles } from '../../interfaces/Vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private vehiclesSubject = new BehaviorSubject<Vehicles[]>([]);
  vehiclesSubject$ = this.vehiclesSubject.asObservable();

  constructor() { }

  get() {
    return this.vehiclesSubject
  }

  add(vehicle: Vehicles) {
    this.vehiclesSubject.next([...this.vehiclesSubject.value, vehicle])
  }

  set(vehicles: Vehicles[]) {
    this.vehiclesSubject.next(vehicles)
  }
}
