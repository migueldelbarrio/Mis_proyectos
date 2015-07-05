module.exports = function(sequelize, DataTypes){

	return sequelize.define(
			"Users",
			{
				nombre:{ type: DataTypes.STRING, validate:{notEmpty:{msg:"--> Falta el nombre"}}},
				pass:{ type: DataTypes.STRING, validate:{notEmpty:{msg:"--> Falta el pass"}}}


			}

		);

}