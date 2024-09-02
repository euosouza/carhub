import { expect } from "chai";
import sinon from "sinon";

import { VehiclesController } from "../controllers/vehicles.controller";
import { HttpStatusCode, MessageError } from "../models/http.interface";
import { Vehicles } from "../models/vehicles.interfaces";
import { VehiclesRepository } from "../repositories/vehicles.repository";

describe("VehiclesController", () => {
  let vehiclesRepository: sinon.SinonStubbedInstance<VehiclesRepository>;
  let vehiclesController: VehiclesController;

  beforeEach(() => {
    vehiclesRepository = sinon.createStubInstance(VehiclesRepository);
    vehiclesController = new VehiclesController(vehiclesRepository);
  });

  describe("findAll", () => {
    it("should return all vehicles with status 200", async () => {
      const mockVehicles: Vehicles[] = [{
        id: 1,
        ano: "2015",
        chassi: "6S5FD5SFS5DF4",
        marca: "Fiat",
        modelo: "Argo",
        placa: "SD5F46",
        renavam: "65481651651"
      }];

      vehiclesRepository.findAll.resolves(mockVehicles);

      const response = await vehiclesController.findAll();

      expect(response.status).to.equal(HttpStatusCode.OK);
      expect(response.data).to.deep.equal(mockVehicles);
    });

    it("should return an error with status 500 if an exception occurs", async () => {
      vehiclesRepository.findAll.rejects(new Error("Database error"));

      const response = await vehiclesController.findAll();

      expect(response.status).to.equal(HttpStatusCode.SERVER_ERROR);
      expect(response.data).to.equal("Database error");
    });
  });

  describe("findOne", () => {
    it("should return a vehicle with status 200 if found", async () => {
      const mockVehicle: Vehicles = {
        id: 1,
        ano: "2015",
        chassi: "6S5FD5SFS5DF4",
        marca: "Fiat",
        modelo: "Argo",
        placa: "SD5F46",
        renavam: "65481651651"
      };
      vehiclesRepository.findOne.resolves(mockVehicle);

      const response = await vehiclesController.findOne(1);

      expect(response.status).to.equal(HttpStatusCode.OK);
      expect(response.data).to.deep.equal(mockVehicle);
    });

    it("should return an error with status 400 if vehicle not found", async () => {
      vehiclesRepository.findOne.resolves(null);

      const response = await vehiclesController.findOne(1);

      expect(response.status).to.equal(HttpStatusCode.BAD_REQUEST);
      expect(response.data).to.equal(MessageError.ERROR_FINDONE_VEHICLE);
    });

    it("should return an error with status 500 if an exception occurs", async () => {
      vehiclesRepository.findOne.rejects(new Error("Database error"));

      const response = await vehiclesController.findOne(1);

      expect(response.status).to.equal(HttpStatusCode.SERVER_ERROR);
      expect(response.data).to.equal("Database error");
    });
  });

  describe("create", () => {
    it("should create a vehicle with status 201", async () => {
      const createdVehicle: Vehicles = {
        id: 1,
        ano: "2015",
        chassi: "6S5FD5SFS5DF4",
        marca: "Fiat",
        modelo: "Argo",
        placa: "SD5F46",
        renavam: "65481651651"
      };

      vehiclesRepository.create.resolves(createdVehicle);

      const response = await vehiclesController.create(createdVehicle);

      expect(response.status).to.equal(HttpStatusCode.CREATED);
      expect(response.data).to.deep.equal(createdVehicle);
    });

    it("should return an error with status 500 if an exception occurs", async () => {
      vehiclesRepository.create.rejects(new Error("Database error"));

      const response = await vehiclesController.create({
        ano: "2015",
        chassi: "6S5FD5SFS5DF4",
        marca: "Fiat",
        modelo: "Argo",
        placa: "SD5F46",
        renavam: "65481651651"
      });

      expect(response.status).to.equal(HttpStatusCode.SERVER_ERROR);
      expect(response.data).to.equal("Database error");
    });
  });

  describe("delete", () => {
    it("should delete a vehicle with status 200", async () => {
      const deleteVehicle: Vehicles = {
        id: 1,
        ano: "2015",
        chassi: "6S5FD5SFS5DF4",
        marca: "Fiat",
        modelo: "Argo",
        placa: "SD5F46",
        renavam: "65481651651"
      };

      vehiclesRepository.remove.resolves(deleteVehicle);

      const response = await vehiclesController.delete(1);

      expect(response.status).to.equal(HttpStatusCode.OK);
      expect(response.data).to.equal(deleteVehicle);
    });

    it("should return an error with status 500 if an exception occurs", async () => {
      vehiclesRepository.remove.rejects(new Error("Database error"));

      const response = await vehiclesController.delete(1);

      expect(response.status).to.equal(HttpStatusCode.SERVER_ERROR);
      expect(response.data).to.equal("Database error");
    });
  });

  describe("update", () => {
    it("should update a vehicle with status 200", async () => {
      const updatedVehicle: Vehicles = {
        id: 1,
        ano: "2015",
        chassi: "6S5FD5SFS5DF4",
        marca: "Fiat",
        modelo: "Argo",
        placa: "SD5F46",
        renavam: "65481651651"
      };
      vehiclesRepository.update.resolves(updatedVehicle);

      const response = await vehiclesController.update(updatedVehicle);

      expect(response.status).to.equal(HttpStatusCode.OK);
      expect(response.data).to.deep.equal(updatedVehicle);
    });

    it("should return an error with status 500 if an exception occurs", async () => {
      const updatedVehicle: Vehicles = {
        id: 1,
        ano: "2015",
        chassi: "6S5FD5SFS5DF4",
        marca: "Fiat",
        modelo: "Argo",
        placa: "SD5F46",
        renavam: "65481651651"
      };

      vehiclesRepository.update.rejects(new Error("Database error"));

      const response = await vehiclesController.update(updatedVehicle);

      expect(response.status).to.equal(HttpStatusCode.SERVER_ERROR);
      expect(response.data).to.equal("Database error");
    });
  });
});

