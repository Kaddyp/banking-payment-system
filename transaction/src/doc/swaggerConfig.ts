import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "POS Payment API",
      version: "1.0.0",
      description: "API for POS terminal transactions including payments, refunds, and transaction retrieval.",
    },
    servers: [{ url: "http://localhost:4005" }],
  },
  apis: ["./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api/transactions/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
