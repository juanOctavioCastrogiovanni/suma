let sequelize = require('sequelize')
let Op = sequelize.Op
let db = require('../database/models')
var reset;
var inicio;

module.exports = {
    list: (req, res) => {
        res.render('index', { title: 'Express' });
    },
    inicio: (req, res) => {
        inicio = req.body.inicio;
        res.redirect('/')
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
        let obj = {};
        let contador = 0;
        let array = [];
        let arrayobj= [];
        if(reset == undefined){
        db.Numero.findAll()
            .then(numeros => {
                for(var numero of numeros){
                    // for(var num in numero){
                        array.push(numero.numero)
                        arrayobj.push(obj={id: contador++,numero: numero.numero})
                    // }
                }
              arrayobj.shift()
               var suma = array.reduce((acum,num)=>{
                    return acum + num
                })
                res.render('index', { title: 'Express', suma: suma, tabla: arrayobj,inicio:inicio});
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
                        arrayobj.push(obj={id: contador++,numero: numero.numero})
                    // }
                }
              arrayobj.shift()
               var suma = array.reduce((acum,num)=>{
                    return acum + num
                })
                res.render('index', { title: 'Express', suma: suma, tabla: arrayobj,inicio:inicio});
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