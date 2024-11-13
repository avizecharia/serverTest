import express from "express";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import userController from "./src/controllers/user"

const port = process.env.PORT || 3000

const app = express()
const httpServer = http.createServer(app)

export const io = new Server(httpServer,{
    cors: {
        origin: "*",
        methods: "*",
      },
})

app.use(express.json());
app.use(cors());

app.use("/api/user",userController)


httpServer.listen(port, () => {
    console.log(`Server started ,Visit "http://localhost:${port}"`);
  });
  