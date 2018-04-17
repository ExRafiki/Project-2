const mongoose    = require('mongoose');
const bcrypt      = require('bcrypt');
mongoose.Promise = require('bluebird');

const userSchema  = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  tvshows: [{type: mongoose.Schema.ObjectId, ref: 'Tvshow'}]
//---------------VALID OR NOT---------------------------------------------------
});
userSchema.methods.validPassword = function validPassword(password){
  return bcrypt.compareSync(password, this.password);
};
//------------------------------------------------------------------------------
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });
//-------------CHECKING---------------------------------------------------------
userSchema.pre('validate', function checkPassword(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});
//-------------HASHING----------------------------------------------------------
userSchema.pre('save', function HashPassword(next) {
  if(this.isModified('password')){//taken from above schema
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});
//------------------------------------------------------------------------------
module.exports = mongoose.model('User', userSchema);
