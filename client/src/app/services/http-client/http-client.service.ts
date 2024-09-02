import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { CreateVehicles, Vehicles } from '../../interfaces/Vehicles';

export interface HttpResponseObservable<T> {
  data: T;
  status: number;
}

const url = environment.api

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<HttpResponseObservable<Vehicles[]>> {
    return this.http
      .get<HttpResponseObservable<Vehicles[]>>(url)
  }

  getVehicle(id: number): Observable<HttpResponseObservable<Vehicles>> {
    return this.http
      .get<HttpResponseObservable<Vehicles>>(`${url}/${id}`,)
  }

  createVehicle(vehicle: CreateVehicles): Observable<HttpResponseObservable<Vehicles>> {
    return this.http
      .post<HttpResponseObservable<Vehicles>>(url, vehicle)
  }

  updateVehicle(vehicle: CreateVehicles): Observable<HttpResponseObservable<Vehicles>> {
    return this.http
      .put<HttpResponseObservable<Vehicles>>(url, vehicle)
  }

  deleteVehicle(id: number) {
    return this.http
      .delete<HttpResponseObservable<Vehicles>>(url, {
        body: {
          id
        }
      })
  }
}
