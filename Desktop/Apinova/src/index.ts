import "reflect-metadata";
import { AppDataSource } from "../src/data-source/data-source";
import express, { Request, Response } from "express";
import routes from "./routes/routes";

// Declare app antes de usá-la
export const app = express();
const port = 3003;

app.use(express.json());

async function connect() {
  try {
    await AppDataSource.initialize(); // Conecta ao banco de dados
    console.log("Conectado com sucesso ao banco de dados!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

connect();
app.use("/api", routes);
app.listen(port, () => {
  console.log(`Express rodando na porta ${port}`);
});
