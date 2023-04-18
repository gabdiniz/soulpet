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
const Pet = require("./database/pet");


app.get("/clientes", async (req, res) => {
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
})

app.get("/clientes/:id", async (req, res) => {
  const cliente = await Cliente.findOne({
    where: { id: req.params.id },
    include: [Endereco]
  });
  (cliente) ? res.json(cliente) : res.status(404).json({ message: "Cliente não encontrado" })
})

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

app.put("/clientes/:id", async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  const { id } = req.params;
  try {
    const cliente = await Cliente.findOne({ where: { id } })
    if (cliente) {
      if (endereco) {
        await Endereco.update(endereco, { where: { clienteId: id } });
      }
      await cliente.update({ nome, email, telefone });
      res.status(200).json({ message: "Cliente editado." })
    }
    else {
      res.status(500).json({ message: "Cliente não encontrado." });
    }
  }
  catch (e) {
    console.log(e)
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})

app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const cliente = await Cliente.findOne({ where: { id } });
  try {
    if (cliente) {
      await cliente.destroy();
      res.status(200).json("Cliente removido");
    }
    else {
      res.status(404).json({ message: "Cliente não encontrado!" });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Um erro ocorreu" });
  }
})

app.get("/pets", async (req, res) => {
  try {
    const listaPets = await Pet.findAll();
    res.json(listaPets);
  }
  catch (e) {
    res.status(500).json({ message: "Um erro ocorreu." })
  }
})

app.get("/pets/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findByPk(id);
  if (pet) {
    res.json(pet)
  }
  else {
    res.status(404).json({ message: "Pet não encontrado"});
  }
})

app.post("/pets", async (req, res) => {
  const { nome, tipo, porte, dataNasc, clienteId } = req.body;
  try {
    const cliente = await Cliente.findOne({ where: { id: clienteId }});
    if (cliente) {
      const novo = await Pet.create({ nome, tipo, porte, dataNasc, clienteId });
      res.status(201).json(novo);
    }
    else {
      res.status(404).json("Cliente não encontrado.");
    }
  }
  catch (e) {
    res.status(500).json({ message: "Ocorreu um erro." })
  }
})

app.put("/pets/:id", async (req, res) => {
  const { nome, tipo, porte, dataNasc, clienteId } = req.body;
  const { id } = req.params;
  const pet = await Pet.findOne({ where: { id } })
  try {
    if (pet) {
      await pet.update({ nome, tipo, porte, dataNasc, clienteId })
      res.status(200).json("Pet editado.");
    }
    else {
      res.status(404).json({ message: "Pet não encontrado." })
    }
  }
  catch (e) {
    res.status(500).json("Um erro ocorreu.");
  }
})

app.delete("/pets/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findOne({ where: { id } });
  try {
    if (pet) {
      await pet.destroy();
      res.status(200).json("Pet removido.");
    }
    else {
      res.status(404).json({ message: "Pet não encontrado. " });
    }
  }
  catch (e) {
    res.status(500).json({ message: "Ocorreu um erro." })
  }
})

// Escuta de eventos (listen)
app.listen(3000, () => {
  connection.sync({ force: true })
  console.log("Servidor rodando em http://localhost:3000")
});