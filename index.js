// Vai disponibilizar o uso de variaveis de ambiente 
require("dotenv").config();
const express = require("express");

// Configuração do App
const app = express();
app.use(express.json());

// Configuração do banco de dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // efetivar conexão
const Cliente = require("./database/cliente"); // configura model da aplicação
const Endereco = require("./database/endereco");

//Definição de rotas

// Escuta de eventos (listen)
app.listen(3000, () => {
  connection.sync({ force: true })
  console.log("Servidor rodando em http://localhost:3000")
});