import express from "express";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import userController from "./src/controllers/user"
import launchController from "./src/controllers/launches"
import connectToMongo from "./src/config/db";
import { getYourDeffenceAttackService } from "./src/services/launchService";
import { handelSocketConnection } from "./src/sockets/io";

const port = process.env.PORT || 3000
connectToMongo()
const app = express()
const httpServer = http.createServer(app)

export const io = new Server(httpServer,{
    cors: {
        origin: "*",
        methods: "*",
      },
})
io.on("connection",handelSocketConnection)

app.use(express.json());
app.use(cors());

app.use("/api/user",userController)
app.use("/api/launche",launchController)


httpServer.listen(port, () => {
    console.log(`Server started ,Visit "http://localhost:${port}"`);
  });