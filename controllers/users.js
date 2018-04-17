const User = require('../models/user');
const Tvshow = require('../models/show');

//---------USER DELETE----------------------------------------------------------
function userDelete(req, res) {
  User
    .findById(req.params.id)// find all users for now if you can set it up
    .exec();
  // .then((whatyouput) => {
  //   whatyouput.remove();
  return req.session.regenerate(() => res.redirect('/'));
  // });
}
//----------USER SHOW-----------------------------------------------------------
// function usersShow(req, res) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then(user => {
//       Tvshow
//         .find({ user: user.id })
//         .exec()
//         .then(shows => {
//           res.render('users/show', { user, shows })
//         })
//     })
// }
function userPop(req, res){
  res.render('users/profile');
}
//------------------------------------------------------------------------------
module.exports = {
  delete: userDelete,
  create: userPop
};
