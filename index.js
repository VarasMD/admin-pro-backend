require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./DataBase/config');

//Crear el servicio de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//DataBase
dbConnection();

//Rutas
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en puesrto ' + process.env.PORT)
})