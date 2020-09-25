let sequelize = require('sequelize')
let Op = sequelize.Op
let db = require('../database/models')

var reset;

module.exports = {
    list: (req, res) => {
        res.render('index', { title: 'Express' });
    },
    verAnterior: async (req,res)=> {

        let numeroAnterior = await db.Numero.findAll();
        let posicion = numeroAnterior.length-1;
        // res.json(numeroAnterior[posicion].numero)
        res.render('index', { title: 'Express', ultimo: numeroAnterior[posicion]});
    },
    sumando: (req, res) => {
        let array = [];
        let numero;
        if(req.body.numero.indexOf('.')!=-1){
            array = req.body.numero.split('.');
            numero = array.join('');
        } else {
            numero = req.body.numero;
        }

         db.Numero.create({
             numero: parseInt(numero)
         })

         res.redirect('/')
    },
    suma: (req, res) => {
        let array = [];
        if(reset == undefined){
        db.Numero.findAll()
            .then(numeros => {
                for(var numero of numeros){
                    // for(var num in numero){
                        array.push(numero.numero)
                    // }
                }
               var suma = array.reduce((acum,num)=>{
                    return acum + num
                })

                res.render('index', { title: 'Express', suma: suma});
            })
        } else {
            db.Numero.findAll({
                where: {
                    id: {
                    [Op.gt]: reset
                    }
                }
            })
            .then(numeros => {
                for(var numero of numeros){
                    // for(var num in numero){
                        array.push(numero.numero)
                    // }
                }
               var suma = array.reduce((acum,num)=>{
                    return acum + num
                })

                res.render('index', { title: 'Express', suma: suma});
            })
        }
            
    },
    reset : (req,res) => {
        reset = req.params.id;

        db.Numero.create({
            numero: 0
        })

        res.redirect('/')
    }
}