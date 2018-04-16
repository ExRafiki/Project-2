const User = require('../models/user');
//------------------------------------------------------------------------------
function userDelete(req, res) {
  User
    .findById(req.params.id)// find all users for now if you can set it up
    .exec();
  // .then((whatyouput) => {
  //   whatyouput.remove();
  return req.session.regenerate(() => res.redirect('/'));
  // });
}

function userPop(req, res){
  res.render('users/profile');
}
//------------------------------------------------------------------------------
module.exports = {
  delete: userDelete,
  create: userPop
};
