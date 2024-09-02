import { HttpResponse } from "./http.interface";

export interface Vehicles {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;
}

export interface CreateVehicles {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: string;
}

export interface IVehiclesRepositores {
  create(vehicle: Vehicles): Promise<Vehicles>;
  findAll(): Promise<Vehicles[]>;
  findOne(id: number): Promise<Vehicles>;
  remove(id: number): Promise<Vehicles>;
  update(vehicle: Vehicles): Promise<Vehicles>;
}

export interface IVehiclesController {
  create(vehicle: Vehicles): Promise<HttpResponse<Vehicles | string>>;
  findAll(): Promise<HttpResponse<Vehicles[] | string>>;
  findOne(id: number): Promise<HttpResponse<Vehicles | string>>;
  delete(id: number): Promise<HttpResponse<Vehicles | string>>;
  update(vehicle: Vehicles): Promise<HttpResponse<Vehicles | string>>;
}





