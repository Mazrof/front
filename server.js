/* eslint-disable @typescript-eslint/no-require-imports */
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((request, response, next) => {
    console.log("Request Received");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

server.use(router);

server.listen(4000, () => {
    console.log("JSON Server Running...");
});
