const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctor = async (req, res=response) => {
	const doctors = await Doctor.find().populate('usuario', 'name').populate('hospital', 'name');
	res.json({
		ok: true,
		doctor: doctors
	})
}

const postDoctor = async (req, res = response) => {
	console.log(req.id)
	const id = req.id;
	const doctor = new Doctor({
		usuario: id,
		...req.body
	});

	try {

		const doctorDB = await doctor.save();

		res.json({
			ok: true,
			doctor:doctorDB
		})		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			message: 'Hable con el administrador'
		})
	}
}

const putDoctor = (req, res) => {
	res.json({
		ok: true,
		msg:'Put Doctor'
	})
}

const deleteDoctor = (req, res) => {
	res.json({
		ok: true,
		msg:'Delete Doctor'
	})
}

module.exports = { getDoctor, postDoctor, putDoctor, deleteDoctor }