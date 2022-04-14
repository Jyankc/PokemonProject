const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    uuid:{ 
      primaryKey:true,
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,

    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:true
    },
    hp: {type: DataTypes.INTEGER},
    attack:{type: DataTypes.INTEGER},
    defense:{type: DataTypes.INTEGER},
    speed:{type: DataTypes.INTEGER},
    height:{type: DataTypes.INTEGER},
    weigth:{type: DataTypes.INTEGER},
    img:{type: DataTypes.TEXT}

  });

};
