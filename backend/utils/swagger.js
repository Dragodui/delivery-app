const swaggerJsDoc = require("swagger-jsdoc"); 
const swaggerUi = require("swagger-ui-express"); 
 
// Определение конфигурации Swagger 
const swaggerOptions = { 
  definition: { 
    openapi: "3.0.0", 
    info: { 
      title: "Delivery App API", 
      version: "1.0.0", 
      description: "Документация API для вашего приложения доставки", 
    }, 
    servers: [ 
      { 
        url: "http://localhost:3000", // Ваш сервер разработки 
      }, 
    ], 
  }, 
  apis: ["./routes/*.js"], // Укажите путь к вашим файлам маршрутов 
}; 
 
const swaggerDocs = swaggerJsDoc(swaggerOptions); 
 
module.exports = (app) => { 
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 
};