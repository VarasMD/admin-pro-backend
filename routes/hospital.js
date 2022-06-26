/*
	Rute: /api/hospital
*/

const { Router } = require('express');
const { getHospital, postHospital, putHospital, deleteHospital } = require('../controller/hospital');
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos');
const { validateJWS } = require('../middleware/validar-jwt');

const router = Router();

router.get('/',  getHospital);
router.post('/',
	[
		validateJWS,
		check('name', 'El nombre del hospital es necesario').not().notEmpty(),
		validarCampos
	], postHospital);
router.put('/:id',
	[], putHospital);
router.delete('/:id', deleteHospital)

module.exports = router;