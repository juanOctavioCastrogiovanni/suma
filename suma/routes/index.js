var express = require('express');
var router = express.Router();
var controller = require('../controllers/controllers.js')

/* GET home page. */
router.get('/', controller.list);

router.get('/ver-anterior', controller.verAnterior)

router.post('/sumando', controller.sumando);

router.get('/suma', controller.suma);


router.post('/inicio', controller.inicio);

router.get('/reset/:id', controller.reset);




module.exports = router;
