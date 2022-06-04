const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		mongoose.connect(process.env.DB_CONNECTION);
		console.log('dbOnline')
	} catch (error) {
		console.log(error);
		throw new Error('Error a la hora de iniciar la BD')
	}
}

module.exports = { dbConnection };