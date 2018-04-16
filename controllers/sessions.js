const User = require('../models/user');
//------------------------------------------------------------------------------
function newSession(req, res) {
  res.render('sessions/new', {name: 'Fil'});
}
//------------------------------------------------------------------------------
function createSession(req, res) {
  User
    .findOne({email: req.body.email})
    .then((user) => {
      if(!user || !user.validPassword(req.body.password)){
        req.flash('danger', 'Something you typed was wrong  ');
        return res.status(401).render('sessions/new');
        // return res.redirect('/signin');
      }

      req.session.userId = user.id;
      res.redirect('/');
    });
}
//------------------------------------------------------------------------------
function deleteSession(req, res){
  return req.session.regenerate(() => res.redirect('/'));
}
//------------------------------------------------------------------------------
module.exports = {
  new: newSession,
  delete: deleteSession,
  create: createSession
};
