const fs = require('fs');
const path = require('path');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { uploadImage } = require("../helpers/upload-image");

const fileUpload = (req, res = response) => {
	const type = req.params.type;
	const id = req.params.id;

	const typesValids = ['hospital', 'doctor', 'user']
	
	if (!typesValids.includes(type)) {
		return res.status(400).json({
			ok: false,
			msg:'El tipo no es valido'
		})
	}

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg:'No hay archivos cargados'
		});
	}

	//Procesar imagen
	const file = req.files.image;
	const nameSplit = file.name.split('.');
	const fileExtention = nameSplit[nameSplit.length - 1];

	//Validar extenciones
	var extentionsValids = ['png', 'jpg', 'jpeg', 'gif'];
	if (!extentionsValids.includes(fileExtention)) {
		return res.status(400).json({
			ok: false,
			msg:'La extension no es valida'
		})
	}

	//Generar nombre del archivo
	const nameFile = `${uuidv4()}.${fileExtention}`
	
	//Path para guardar la imagen
	const path = `./upload/${type}/${nameFile}`
	
	//Mover la imagen
	file.mv(path, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).json({
				ok: false,
				msg: 'Error al mover la imagen'
			});
		}

		//Actualizar base
		uploadImage(type, id, nameFile);

		res.json({
			ok: true,
			msg: 'Archivo Subido',
			nameFile
		})
	});
}

const returnImage = (req, res) => {
	const type = req.params.type;
	const image = req.params.image;

	const pathImage = path.join(__dirname, `../upload/${type}/${image}`);

	if (fs.existsSync(pathImage)) {
		res.sendFile(pathImage);
	} else {
		const pathImage = path.join(__dirname, `../upload/image-not-found.webp`);
		res.sendFile(pathImage);
	}

	
}

module.exports = {
	fileUpload, returnImage
}