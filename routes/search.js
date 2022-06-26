/*
	Rute: /api/todo
*/

const { Router } = require('express');
const { getAll, getCollection } = require('../controller/search');
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos');
const { validateJWS } = require('../middleware/validar-jwt');

const router = Router();

router.get('/:searchParam', validateJWS, getAll);

router.get('/collection/:table/:searchParam', validateJWS,  getCollection);

module.exports = router;