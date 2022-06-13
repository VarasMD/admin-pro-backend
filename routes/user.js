/*
	Rute: /api/user
*/

const { Router } = require('express');
const { getUser, postUser, putUser, deleteUser } = require('../controller/user')
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos');
const { validateJWS } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validateJWS, getUser);
router.post('/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		validarCampos
	], postUser);
router.put('/:id',
	[
		validateJWS,
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password es obligatorio').not().isEmpty(),
		check('role', 'El role es obligatorio').isEmpty(),
		validarCampos
	], putUser);
router.delete('/:id',validateJWS, deleteUser)

module.exports = router;