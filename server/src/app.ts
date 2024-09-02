import cors from "@fastify/cors";
import fastify, { FastifyInstance } from "fastify";

export const app: FastifyInstance = fastify();

app.register(cors);
