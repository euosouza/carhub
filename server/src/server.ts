import { app } from "./app";
import { vehiclesRoutes } from "./routes";

const PORT = Number(process.env.PORT) || 3000;

app.register(vehiclesRoutes, { prefix: "vehicles" });

app.listen({ port: PORT })
  .then(() => console.log(`Servidor está rodando na porta: ${PORT}`))
  .catch((e) => console.log(e));
