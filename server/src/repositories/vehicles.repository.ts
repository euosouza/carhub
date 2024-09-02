
import { prisma } from "../database/prisma-client";
import { MessageError } from "../models/http.interface";
import { CreateVehicles, IVehiclesRepositores, Vehicles } from "../models/vehicles.interfaces";

export class VehiclesRepository implements IVehiclesRepositores {
  async findAll(): Promise<Vehicles[]> {
    return await prisma.vehicles.findMany();
  }

  async findOne(id: number): Promise<Vehicles | null> {
    console.log(typeof id);
    const result = await prisma.vehicles.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!result) throw new Error(MessageError.ERROR_FINDONE_VEHICLE);

    return result;
  }

  async remove(id: number): Promise<Vehicles> {
    try {
      const existVehicle = await prisma.vehicles.findUnique({
        where: {
          id
        }
      });

      if (!existVehicle) throw new Error(MessageError.ERROR_FINDONE_VEHICLE);

      const result = await prisma.vehicles.delete({
        where: { id },
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(MessageError.ERROR_DELETE_VEHICLES);
    }
  }

  async update(vehicle: Vehicles): Promise<Vehicles> {
    try {
      const existVehicle = await prisma.vehicles.findUnique({
        where: {
          id: vehicle.id
        }
      });

      if (!existVehicle) throw new Error(MessageError.ERROR_FINDONE_VEHICLE);

      const result = await prisma.vehicles.update({
        where: { id: vehicle.id },
        data: vehicle
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(MessageError.ERROR_UPDATE_VEHICLES);
    }
  }

  async create(vehicle: CreateVehicles): Promise<Vehicles> {
    const result = await prisma.vehicles.create({
      data: vehicle
    });

    if (!result) throw new Error(MessageError.ERROR_CREATE_VEHICLES);
    return result;
  }
}


