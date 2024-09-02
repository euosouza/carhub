import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { VehiclesController } from "./controllers/vehicles.controller.js";
import { HttpStatusCode, MessageError } from "./models/http.interface.js";
import { CreateVehicles, Vehicles } from "./models/vehicles.interfaces.js";
import { VehiclesRepository } from "./repositories/vehicles.repository";

export async function vehiclesRoutes(app: FastifyInstance) {
  // Busca todo os veÍculos cadastrados
  app.get("/", async (resquest: FastifyRequest, response: FastifyReply) => {
    const vehiclesRepository = new VehiclesRepository();
    const vehiclesController = new VehiclesController(vehiclesRepository);

    const { status, data } = await vehiclesController.findAll();

    response.code(status).send({
      status,
      data
    });
  });

  // Busca um unico veÍculo cadastrado
  app.get("/:id", async (request: FastifyRequest<{ Params: { id: number } }>, response: FastifyReply) => {
    const { id } = request.params;

    if (!id) {
      response.code(HttpStatusCode.BAD_REQUEST).send({
        status: HttpStatusCode.BAD_REQUEST,
        data: MessageError.ERROR_ID_NOT_FOUND
      });
    }

    const vehiclesRepository = new VehiclesRepository();
    const vehiclesController = new VehiclesController(vehiclesRepository);

    const { status, data } = await vehiclesController.findOne(id);

    response.code(status).send({
      status,
      data
    });
  });

  // Cria um veículo
  app.post("/", async (request: FastifyRequest<{ Body: CreateVehicles }>, response: FastifyReply) => {
    const { marca, ano, chassi, modelo, placa, renavam } = request.body;

    const requiredFields = { marca, ano, chassi, modelo, placa, renavam };

    // Verifica se alguma das propriedades está ausente
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return response.code(HttpStatusCode.BAD_REQUEST).send({
          status: HttpStatusCode.BAD_REQUEST,
          data: `${key} ${MessageError.ERROR_PROP_NOT_FOUND}`,
        });
      }
    }

    const vehiclesRepository = new VehiclesRepository();
    const vehiclesController = new VehiclesController(vehiclesRepository);

    const { data, status } = await vehiclesController.create({
      ano, chassi, marca, modelo, placa, renavam
    });

    response.code(status).send({
      status,
      data
    });
  });

  // Altera propriedades de um veÍculo cadastrado
  app.put("/", async (request: FastifyRequest<{ Body: Vehicles }>, response: FastifyReply) => {
    const { id, marca, ano, chassi, modelo, placa, renavam } = request.body;

    const requiredFields = { id, marca, ano, chassi, modelo, placa, renavam };

    // Verifica se alguma das propriedades está ausente
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return response.code(HttpStatusCode.BAD_REQUEST).send({
          status: HttpStatusCode.BAD_REQUEST,
          data: `${key} ${MessageError.ERROR_PROP_NOT_FOUND}`,
        });
      }
    }

    const vehiclesRepository = new VehiclesRepository();
    const vehiclesController = new VehiclesController(vehiclesRepository);

    const { data, status } = await vehiclesController.update({
      id, ano, chassi, marca, modelo, placa, renavam
    });

    response.code(status).send({
      status,
      data
    });
  });

  // Deleta um veÍculo cadastrado
  app.delete("/", async (request: FastifyRequest<{ Body: { id: number } }>, response: FastifyReply) => {
    const { id } = request.body;

    if (!id) {
      response.code(HttpStatusCode.BAD_REQUEST).send({
        status: HttpStatusCode.BAD_REQUEST,
        data: MessageError.ERROR_ID_NOT_FOUND
      });
    }

    const vehiclesRepository = new VehiclesRepository();
    const vehiclesController = new VehiclesController(vehiclesRepository);

    const { status, data } = await vehiclesController.delete(id);

    response.code(status).send({
      status,
      data
    });
  });
}
