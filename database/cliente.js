// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada proprieda vira uma coluna da tabela


// DataTypes = serve para definir qual o tipo da coluna
const {DataTypes} = require("sequelize");
const {connection} = require("./database");

const Cliente = connection.define("cliente", {
  // Configurar a coluna 'nome'
  nome: { 
    // nome VARCHAR NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    // email VARCHAR UNIQUE NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    // telefone VARCHAR NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = Cliente;