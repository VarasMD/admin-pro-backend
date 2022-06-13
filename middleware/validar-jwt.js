const jwt = require('jsonwebtoken');

const validateJWS = (req, res, next) => {
	//Leer token
	const token = req.header('x-token');
	console.log(token)

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la peticion'
		})
	}

	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET);

		req.id = id;

		next();

	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Token invalido'
		})
	}
	
}

module.exports = {
	validateJWS
}