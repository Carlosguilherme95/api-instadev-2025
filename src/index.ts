import "reflect-metadata";
import { AppDataSource } from "./data-source/database-conection";
import express from "express";
export const app = express();

const port = 3000;

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

app.listen(port, () => {
  console.log(`Express rodando na porta ${port}`);
});
