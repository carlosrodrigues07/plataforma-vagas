const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db', 'database.sqlite')
  });
  
console.log('Caminho do banco de dados:', path.join(__dirname, 'db', 'database.sqlite'));


const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Candidatura = sequelize.define('Candidatura', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  requisitos: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Usuario.hasMany(Candidatura, { foreignKey: 'usuario_id' });
Candidatura.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = {
  Usuario,
  Candidatura,
  sequelize,
};
