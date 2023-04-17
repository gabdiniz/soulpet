// database.js = arquivo de conexão com o banco de dados
// ele vai ler as variáveis de ambiente e tentar conectar ao MySQL

const { Sequelize } = require("sequelize");

// Criamos um objeto de conexão
const connection = new Sequelize(
  process.env.DB_NAME, // nome reservado para o database
  process.env.DB_USER, // usuario reservado para conexão
  process.env.DB_PASSWORD, // senha reservada oara conexão
  {
    host: process.env.DB_HOST, //endereço (banco local)
    dialect: "mysql", // o banco utilizado
  }
)

// Estabelecer conexão usando o objeto
async function authenticate(connection) {
  try {
    await connection.authenticate(); // tentar estabelecer conexão
    console.log("Conexão estabelecida com sucesso!");
  }
  catch (err) {
    // err = objeto que guarda detalhes sobre o erro que ocorreu
    console.log("Um erro inesperado ocorreu", err);
  }
}

module.exports = { connection, authenticate };