const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { genereteJWT } = require('../helpers/jwt');

const getUser = async (request, res) => {
	const users = await User.find({}, 'name role password email google');

	res.json({
		ok: true,
		users
	})
}

const postUser = async(request, res = response) => {
	const { email, password, name } = request.body;
	
	try {
		const existEmail = await User.findOne({ email });

		if (existEmail) {
			return res.status(400).json({
				ok: false,
				msg: 'El correo ya existe'
			})
		}

		const user = new User(request.body);
		//Crypto el password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);
		
		//Guardar Usuario
		await user.save();

		//Generar TOKEN - JWT
		const token = await genereteJWT(user.id)
	
		res.json({
			ok: true,
			user,
			token
		})		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs'
		});
	}


}

const putUser = async (req, res = response) => {
	//Validar token y si es el usuario correcto
	const id = req.params.id 
	try {
		const userDB = await User.findById(id);
		if (!userDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe el usuario con ese id'
			})
		}

		//Actualizar
		const { google, password, email, ...campos} = req.body;
		if (userDB.email !== email) {
			const existEmail = await User.findOne({ email })
			if (existEmail) {
				return res.status(400).json({
					ok: false,
					msg: 'Ta existe el email'
				})
			}
		}

		campos.email = email;
		const userUpdate = await User.findByIdAndUpdate(id, campos, { new: true });

		res.json({
			ok: true,
			user: userUpdate
		})
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		})
	}
}

const deleteUser = async (req, res = response) => {
	const id = req.params.id

	try {
		const userDB = await User.findById(id);
		if (!userDB) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe el usuario con ese id'
			})
		}

		await User.findByIdAndDelete(id);

		res.json({
			ok: true,
			medg: 'Usuario eliminado'
		})
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		})
	}
}

module.exports = { getUser, postUser, putUser, deleteUser }