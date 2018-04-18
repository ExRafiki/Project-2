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
          res.render('users/show', { user, shows });// would this work putting user and sows together
        });
    });
}
//---------USER EDIT------------------------------------------------------------
function userEdit(req, res) {
  User
    .findById(req.params.id)
    // do i need to populate here ?
    .exec()
    .then(user => res.render('users/edit', {user}));
}
//---------USER UPDATE----------------------------------------------------------
function userUpdate(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(loggedinuser => {
      console.log('I AM HERE');
      loggedinuser = Object.assign(loggedinuser, req.body);
      return loggedinuser.save();
    })
    .then(user => res.redirect(`/users/${user._id}`));
  // add a flash saying it has been update
}
//---------USER DELETE----------------------------------------------------------
function userDelete(req, res) {
  User
    .findById(req.params.id)// find all users for now if you can set it up
    .exec()
    .then((whatyouput) => {
      whatyouput.remove();
      return req.session.regenerate(() => res.redirect('/'));
    });
}
//----------USER FAV------------------------------------------------------------
// function userFav(req, res) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then(user => {
//       Tvshow
//         .find({user: user.id })
//         .exec()
//         .then(shows => {
//           res.render('/users/show', { user, shows });// would this work putting user and sows together
//         });
//     });
// }
//------------------------------------------------------------------------------
module.exports = {
  show: userShow,
  edit: userEdit,
  update: userUpdate,
  delete: userDelete
};
