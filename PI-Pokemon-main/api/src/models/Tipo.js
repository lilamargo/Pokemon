const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tipo', {
    // id:{
    //   type: DataTypes.UUID, // UUID: GENERA UN NUMERO RANDOM CON LETRAS Y NUMEROS PARA QUE NO SE PISE CON EL ID DE LA API POKEMON.
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false,  //SE SETEA EN FALSO PARA QUE NO SE PERMITA QUE ESTA VACIO, O SEA ES UN CAMPO OBLIGATORIO REQUERIDO.
    //   primaryKey: true   //DA LA PROPIEDAD A ID DE QUE ES LA CLAVE PRIMARIA.
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
