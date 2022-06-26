const { response } = require('express');

const Usuario = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getAll = async (req, res = response) => {
	const idParam = req.params.searchParam
	const regex = new RegExp(idParam, 'i');

	const [usuarios, hospital, doctor] = await Promise.all([
		Usuario.find({ name: regex }),
		Hospital.find({ name: regex }),
		Doctor.find({ name: regex })
	])

	res.json({
		ok: true,
		usuarios,
		hospital,
		doctor
	})
}

const getCollection = async (req, res = response) => {
	const idParam = req.params.searchParam
	const collection = req.params.table
	const regex = new RegExp(idParam, 'i');
	let data = [];

	switch (collection) {
		case 'doctors':
			data = await Doctor.find({ name: regex }).populate('usuario', 'name').populate('hospital', 'name');
			break;
		case 'hospitals':
			data = await Hospital.find({ name: regex }).populate('usuario', 'name img');
			break;
		case 'users':
			data = await Usuario.find({ name: regex });
			break;
		default:
			return res.status(400).json({
				ok: false,
				msg: 'La tabla no es correcta'
			});
	}

	res.json({
		ok: true,
		data
	})
}

module.exports = { getAll, getCollection }