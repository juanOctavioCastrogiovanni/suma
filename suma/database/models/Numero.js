module.exports = function (sequelize,dataTypes){
    let alias = 'Numero'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type:dataTypes.DECIMAL(2,0),
            allowNull: true
        }
    }

    let config = {
        tableName: 'numeros',
        timestamps: false,
    }

    let numero = sequelize.define(alias, cols, config)
    
    return numero
}