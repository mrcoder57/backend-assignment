import express from "express";
import http from "http";
import cors from "cors";
import { connect } from "./utils/connect.js";
import { config } from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from "../swaggerConfig.js";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import subtaskRouter from "./routes/subtask.routes.js";

config();
const app = express();
app.use(cors());
const server = http.createServer(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get("/home", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();
  app.use('/user',userRouter)
  app.use('/task',taskRouter)
  app.use('/subtask',subtaskRouter)
});
