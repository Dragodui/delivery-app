const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Delivery App API",
      version: "1.0.0",
      description: "Документация API для приложения доставки",
    },
    servers: [
      {
        url: "http://localhost:5000", // URL сервера разработки
      },
    ],
  },
  apis: ["./routes/*.js"], // Укажите путь к вашим маршрутам
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
