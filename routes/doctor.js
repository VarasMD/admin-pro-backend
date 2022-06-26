/*
	Rute: /api/doctor
*/

const { Router } = require('express');
const { getDoctor, postDoctor, putDoctor, deleteDoctor } = require('../controller/doctor');
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos');
const { validateJWS } = require('../middleware/validar-jwt');

const router = Router();

router.get('/',  getDoctor);
router.post('/',
	[
		validateJWS,
		check('name', 'El nombre del medico es necesario').not().notEmpty(),
		check('hospital', 'El hospital debe ser valido').isMongoId(),
		validarCampos
	], postDoctor);
router.put('/:id',
	[], putDoctor);
router.delete('/:id', deleteDoctor)

module.exports = router;