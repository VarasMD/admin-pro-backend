/*
	Rute: /api/auth
*/
const { Router } = require('express');
const { login } = require('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.post('/',
	[
		check('password', 'El password es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		validarCampos
	],
	login
)

module.exports = router;