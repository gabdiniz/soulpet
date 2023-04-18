const {DataTypes} = require("sequelize");
const {connection} = require("./database");

const Pet = connection.define("pet", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  porte: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataNasc: {
    type: DataTypes.DATEONLY
  }
});



module.exports = Pet;