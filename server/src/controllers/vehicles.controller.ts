import { HttpResponse, HttpStatusCode } from "../models/http.interface";
import { CreateVehicles, IVehiclesController, Vehicles } from "../models/vehicles.interfaces";
import { VehiclesRepository } from "../repositories/vehicles.repository";
import { handleErrorMessage } from "../utils/error";
import { MessageError } from "./../models/http.interface";

export class VehiclesController implements IVehiclesController {
  constructor(private readonly vehiclesRepository: VehiclesRepository) { }

  async findAll(): Promise<HttpResponse<Vehicles[] | string>> {
    try {
      const vehicles = await this.vehiclesRepository.findAll();

      return {
        status: HttpStatusCode.OK,
        data: vehicles
      };
    } catch (error) {
      return {
        status: HttpStatusCode.SERVER_ERROR,
        data: handleErrorMessage(error)
      };
    }
  }

  async findOne(id: number): Promise<HttpResponse<Vehicles | string>> {
    try {
      const vehicle = await this.vehiclesRepository.findOne(id);

      if (!vehicle) {
        return {
          status: HttpStatusCode.BAD_REQUEST,
          data: MessageError.ERROR_FINDONE_VEHICLE
        };
      }

      return {
        status: HttpStatusCode.OK,
        data: vehicle
      };
    } catch (error) {
      return {
        status: HttpStatusCode.SERVER_ERROR,
        data: handleErrorMessage(error)
      };
    }
  }

  async create(vehicle: CreateVehicles): Promise<HttpResponse<Vehicles | string>> {
    try {
      const createdVehicle = await this.vehiclesRepository.create(vehicle);

      return {
        status: HttpStatusCode.CREATED,
        data: createdVehicle
      };
    } catch (error) {
      return {
        status: HttpStatusCode.SERVER_ERROR,
        data: handleErrorMessage(error)
      };
    }
  }

  async delete(id: number) {
    try {
      const vehicleDeleted = await this.vehiclesRepository.remove(id);

      return {
        status: HttpStatusCode.OK,
        data: vehicleDeleted
      };
    } catch (error) {
      const msgError = handleErrorMessage(error);
      const statusCode = msgError === MessageError.ERROR_FINDONE_VEHICLE ?
        HttpStatusCode.BAD_REQUEST : HttpStatusCode.SERVER_ERROR;

      return {
        status: statusCode,
        data: msgError
      };
    }
  }

  async update(vehicle: Vehicles) {
    try {
      const vehicleUpdated = await this.vehiclesRepository.update(vehicle);

      return {
        status: HttpStatusCode.OK,
        data: vehicleUpdated
      };
    } catch (error) {
      const msgError = handleErrorMessage(error);
      const statusCode = msgError === MessageError.ERROR_FINDONE_VEHICLE ?
        HttpStatusCode.BAD_REQUEST : HttpStatusCode.SERVER_ERROR;

      return {
        status: statusCode,
        data: msgError
      };
    }
  }
}

