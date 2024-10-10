import jsonServer from "json-server";
import type { NextFunction, Request, Response } from "express";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((request: Request, response: Response, next: NextFunction) => {
    console.log("Request Received");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

server.use(router);

server.listen(3001, () => {
    console.log("JSON Server RUNNING");
});