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

// Associação 1:1 (One-to-One)
const Endereco = require("./endereco");

// Cliente tem endereco
// Endereco ganha uma chava estrangeira (nome do modal + Id)
// Chave estrangeira = clienteId
Cliente.hasOne(Endereco); // CLiente tem um Enredeço
Endereco.belongsTo(Cliente); // Endereço pertence a um cliente

module.exports = Cliente;