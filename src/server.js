require("dotenv").config();
const routes = require("./routes");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/", routes);

const env = process.env.PORT;
app.listen(env, () => {
  console.log(`Servidor rodando na porta ${env}`);
});
