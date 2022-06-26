const fs = require('fs');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const deleteImage = (path) => {
	if (fs.existsSync(path)) {
		//borrar imagen anterior
		fs.unlinkSync(path);
	}
}

const uploadImage = async (type, id, nameFile) => {
	let oldPath = ''

	switch (type) {
		case 'doctor':
			const doctor = await Doctor.findById(id);
			if (!doctor) {
				console.log('No es un doctor por ir');
				return false;
			}

			oldPath = `./upload/doctor/${doctor.img}`;
			deleteImage(oldPath);

			doctor.img = nameFile;
			await doctor.save();
			return true;
		break;
		case 'hospital':
			const hospital = await Hospital.findById(id);
			if (!hospital) {
				console.log('No es un hospital por ir');
				return false;
			}

			oldPath = `./upload/hospital/${hospital.img}`;
			deleteImage(oldPath);

			hospital.img = nameFile;
			await hospital.save();
			return true;
			
		break;
		case 'user':
			const user = await User.findById(id);
			if (!user) {
				console.log('No es un user por ir');
				return false;
			}

			oldPath = `./upload/user/${user.img}`;
			deleteImage(oldPath);

			user.img = nameFile;
			await user.save();
			return true;
			
		break;
		default:
			break;
	}
}

module.exports = {
	uploadImage
}