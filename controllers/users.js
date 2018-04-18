const User = require('../models/user');
const Tvshow = require('../models/show');
//---------USER SHOW------------------------------------------------------------
function userShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      Tvshow
        .find({ user: user._id })
        .exec()
        .then(shows => {
          res.render('users/show', { user, shows });
        });
    });
}
//---------USER EDIT------------------------------------------------------------
function userEdit(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/edit', {user}));
}
//---------USER UPDATE----------------------------------------------------------
function userUpdate(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(loggedinuser => {
      loggedinuser = Object.assign(loggedinuser, req.body);
      return loggedinuser.save();
    })
    .then(user => res.redirect(`/users/${user._id}`));
}
//---------USER DELETE----------------------------------------------------------
function userDelete(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then((whatyouput) => {
      whatyouput.remove();
      return req.session.regenerate(() => res.redirect('/'));
    });
}
module.exports = {
  show: userShow,
  edit: userEdit,
  update: userUpdate,
  delete: userDelete
};
