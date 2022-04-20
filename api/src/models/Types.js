const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('types', {
    // id:{
    //   primaryKey: true,
    //   type:DataTypes.INTEGER,
    //   autoIncrement: true,
    //   allowNull:false,
    //   unique:true,

      
    // },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique:true
      
    }
  
  },{
      timestamps: false,
     

  

  });
};
