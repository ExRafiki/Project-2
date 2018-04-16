const User = require('../models/user');
//------------------------------------------------------------------------------
function newReg(req, res) {
  res.render('registrations/new');
}
//------------------------------------------------------------------------------
function createReg(req, res, next){
  User
    .create(req.body)
    .then(() =>{
      req.flash('info', 'Your account has been created. Please login');
      res.redirect('/signin');
    })
    .catch((err)=> {
      if(err.name === 'ValidationError'){
        return res.badRequest('registrations/new', err);
      }
      next(err);
    });
}
//------------------------------------------------------------------------------
module.exports = {
  new: newReg,
  create: createReg
};
