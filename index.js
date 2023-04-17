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
app.post("/clientes", async (req, res) => {
  const { nome, email, telefone, endereco } = req.body; // Coletar informação do req.body
  try {
    // Dentro de 'novo' estará o objeto criado
    const novo = await Cliente.create(  // chamar o Model.create
      { nome, email, telefone, endereco },
      { include: [Endereco] } // permite inserir o endereço junto do cliente
    ); 
    res.status(201).json(novo);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});


// Escuta de eventos (listen)
app.listen(3000, () => {
  connection.sync({ force: true })
  console.log("Servidor rodando em http://localhost:3000")
});