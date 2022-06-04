require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./DataBase/config');

//Crear el servicio de express
const app = express();

//Configurar CORS
app.use(cors());

//DataBase
dbConnection();

//Variables de entorno de Node
//console.log(process.env)

//Rutas
app.get('/', (request, response) => {
	response.json({
		ok: true,
		message: 'Hola Mundo'
	})
})

app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en puesrto ' + process.env.PORT)
})