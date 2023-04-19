// Vai disponibilizar o uso de variaveis de ambiente 
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

// Configuração do App
const app = express();
app.use(express.json());
app.use(morgan("combined"));

// Configuração do banco de dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // efetivar conexão

// Definição de rotas 
const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");

app.use(rotasClientes);
app.use(rotasPets);

// Escuta de eventos (listen)
app.listen(3000, () => {
  connection.sync()
  console.log("Servidor rodando em http://localhost:3000")
});