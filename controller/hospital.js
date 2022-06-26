const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospital = async (req, res = response) => {
	const hospitals = await Hospital.find().populate('usuario', 'name img');

	res.json({
		ok: true,
		hospital: hospitals
	})
}

const postHospital = async (req, res = response) => {

	const id = req.id;
	const hospital = new Hospital({
		usuario: id,
		...req.body
	});

	try {

		const hospitalDB = await hospital.save();

		res.json({
			ok: true,
			hospital:hospitalDB
		})		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message: 'Hable con el administrador'
		})
	}
}

const putHospital = (req, res) => {
	res.json({
		ok: true,
		msg:'Put Hospital'
	})
}

const deleteHospital = (req, res) => {
	res.json({
		ok: true,
		msg:'Delete Hospital'
	})
}

module.exports = { getHospital, postHospital, putHospital, deleteHospital }