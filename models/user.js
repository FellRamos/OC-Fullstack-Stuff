const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Mongoose-unique-validator -> Permite validar uma informacao antes de a guardar na Base de Dados. precisamos deste modulo para o email poder ser unico


const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password : { type: String, required: true}
});

userSchema.plugin(uniqueValidator); // Isto e para conseguirmos utilizar Unique validator

module.exports = mongoose.model('User', userSchema);