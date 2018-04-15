const User = require('../models/user');
//------------------------------------------------------------------------------
function newReg(req, res) {
  res.render('registrations/new');
}
//------------------------------------------------------------------------------
function createReg(req, res){
  User
    .create(req.body)
    .then(() =>{
      res.redirect('/');
    })
    .catch((err)=> {
      if(err.name === 'ValidationError'){
        return res.status(400).render('registrations/new', {message: err.toString()});
      }
    });
}
//------------------------------------------------------------------------------
module.exports = {
  new: newReg,
  create: createReg
};
