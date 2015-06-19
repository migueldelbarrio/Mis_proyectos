// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
            { pregunta:{  type: DataTypes.STRING, allowNull: false,  validate: {
                len: {
                    args: [1, 50],
                    msg: "-->La pregunta debe exceder cierto número de caracteres"
            },
            notEmpty:{msg:"-->Falta la pregunta"}


        }},
              respuesta:{ type: DataTypes.STRING, allowNull: false, validate: {
                len: {
                    args: [1, 50],
                    msg: "-->La respuesta debe exceder cierto número de caracteres"
            },
             notEmpty:{msg:"-->Falta la respuesta"}



        		}},
           	 });
}