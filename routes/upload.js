/*
	Rute: /api/upload
*/

const { Router } = require('express');
const { fileUpload, returnImage } = require('../controller/upload');
const { check } = require('express-validator')
const { validarCampos } = require('../middleware/validar-campos');
const { validateJWS } = require('../middleware/validar-jwt');
const expressFileUpload = require('express-fileupload')

const router = Router();

router.use(expressFileUpload());
router.put('/:type/:id', fileUpload);
router.get('/:type/:image', returnImage);

module.exports = router;