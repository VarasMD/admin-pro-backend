const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
	name: {
		type: String,
		required: true
	},
	img: {
		type: String
	},
	usuario: {
		require: true,
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	hospital: {
		require: true,
		type: Schema.Types.ObjectId,
		ref: 'Hospital'
	}
}, { collection: 'doctors'});

DoctorSchema.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
})

module.exports = model('Doctor', DoctorSchema);