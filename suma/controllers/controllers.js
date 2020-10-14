let sequelize = require('sequelize')
let Op = sequelize.Op
let db = require('../database/models')
var reset;
var inicio;
var total1;
var total;
var restantes;
var idBorrado = [];

module.exports = {
    list: (req, res) => {
        res.render('index', { title: 'Express' });
    },
    inicio: (req, res) => {
        inicio = req.body.inicio;
        total1 = req.body.cantidadTotal;
        res.redirect('/')
    },
    verAnterior: async (req,res)=> {

        let numeroAnterior = await db.Numero.findAll();
        let posicion = numeroAnterior.length-1;
        // res.json(numeroAnterior[posicion].numero)
        
        res.redirect('/reset/'+ numeroAnterior[posicion].id)
    },
    sumando: (req, res) => {
        let array = [];
        let numero;
        idBorrado.push(req.body.idBorrado)

        if(req.body.numero.indexOf('simpleText')!=-1){
            array = req.body.numero.split(':"');
            
            array.forEach(te=>{
                if(parseInt(te)!=null){
                    numero = parseInt(te)
                }
            })


        } else if(req.body.numero.indexOf('.')!=-1){
            array = req.body.numero.split('.');
            numero = array.join('');
        } else {
            numero = req.body.numero;
        }

         db.Numero.create({
             numero: parseInt(numero)
         })

         res.redirect('/suma')
    },
    suma: (req, res) => {
        let obj = {};
        let contador = 0;
        let array = [];
        let arrayobj= [];
        let ultimosTres= [];
        if(reset == undefined){
        db.Numero.findAll()
            .then(numeros => {
                for(var numero of numeros){
                    // for(var num in numero){
                        array.push(numero.numero)
                        if(numero.numero>=0){
                            arrayobj.push(obj={id: contador++,numero: numero.numero})
                            } else {
                                arrayobj.push(obj={id: --contador,numero: numero.numero})
                            }
                    // }
                }
              arrayobj.shift()
              ultimosTres = arrayobj.slice(-14)
              total = arrayobj.slice(-1)[0].id
              restantes = total1 - total



               var suma = array.reduce((acum,num)=>{
                    return acum + num
                })
                
                
                res.render('index', { title: 'Express', suma: suma, tabla: ultimosTres,tablaCompletas: arrayobj ,inicio:inicio,total: total, restantes:restantes, idBorrado:idBorrado});
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
                        if(numero.numero>=0){
                        arrayobj.push(obj={id: contador++,numero: numero.numero})
                        } else {
                            arrayobj.push(obj={id: --contador,numero: numero.numero})
                        }
                    // }
                }
              arrayobj.shift()
              ultimosTres = arrayobj.slice(-14)
              total = arrayobj.slice(-1)[0].id
              restantes = total1 - total
             
              
               var suma = array.reduce((acum,num)=>{
                    return acum + num
                })
                
                
                res.render('index', { title: 'Express', suma: suma, tabla: ultimosTres,tablaCompletas: arrayobj ,inicio:inicio,total:total, restantes:restantes, idBorrado:idBorrado});
            })
        }
            
    },
    reset : (req,res) => {
        reset = req.params.id;

        db.Numero.create({
            numero: 0
        })

      
        idBorrado = []

        res.redirect('/')
    }
}