const Cliente = require("../database/cliente");
const Pet = require("../database/pet");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

router.get("/pets", async (req, res) => {
  try {
    const listaPets = await Pet.findAll();
    res.json(listaPets);
  }
  catch (e) {
    res.status(500).json({ message: "Um erro ocorreu." })
  }
})

router.get("/pets/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findByPk(id);
  if (pet) {
    res.json(pet)
  }
  else {
    res.status(404).json({ message: "Pet não encontrado"});
  }
})

router.post("/pets", async (req, res) => {
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

router.put("/pets/:id", async (req, res) => {
  const { nome, tipo, porte, dataNasc } = req.body;
  const { id } = req.params;
  const pet = await Pet.findByPk(id)
  try {
    if (pet) {
      await pet.update({ nome, tipo, porte, dataNasc })
      // await Pet.update({ nome, tipo, porte, dataNasc }, {where: {id: id}})
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

router.delete("/pets/:id", async (req, res) => {
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

module.exports = router;