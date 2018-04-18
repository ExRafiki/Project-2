const Tvshow = require('../models/show');
const Review = require('../models/review');
//----------TV SHOW MODELS 7----------------------------------------------------
function tvshowsIndex(req, res){
  Tvshow
    .find()
    .populate('user')
    .exec()
    .then(tvshows => {
      res.render('tvshows/index', {tvshows});
    });
}
//----------TV SHOW NEW---------------------------------------------------------
function tvshowsNew(req,res){
  res.render('tvshows/new');
}
//----------TV SHOW SHOW--------------------------------------------------------
function tvshowsShow(req,res){
  Tvshow
    .findById(req.params.id)
    .populate('reviews.user')
    .exec()
    .then(tvshow => {
      console.log('inside the tvshow function--->',tvshow.reviews);
      res.render('tvshows/show', {tvshow});
    });
}
//---------TV SHOW EDIT---------------------------------------------------------
function tvshowsEdit(req,res){
  Tvshow
    .findById(req.params.id)
    .populate('reviews')
    .exec()
    .then(tvshow => {
      res.render('tvshows/edit', {tvshow});
    });
}
//----------TV SHOW DELETE------------------------------------------------------
function tvshowsDelete(req, res){
  Tvshow
    .findById(req.params.id)
    .exec()
    .then(tvshow => tvshow.remove())
    .then(() => res.redirect('/tvshows'));
}
//----------TV SHOW CREATE------------------------------------------------------
function tvshowsCreate(req, res){
  req.body.user = req.currentUser;

  Tvshow
    .create(req.body)
    .then(() => res.redirect('/tvshows'));
}
//----------TV SHOW UPDATE------------------------------------------------------
function tvshowsUpdate(req, res){
  Tvshow
    .findById(req.params.id)
    .exec()
    .then(tvshow => {
      tvshow = Object.assign(tvshow, req.body);
      return tvshow.save();
    })
    .then(tvshow => res.redirect(`/tvshows/${tvshow._id}`));
}
//----------TV Review CREATE------------------------------------------------------
function reviewCreate(req, res){
  Tvshow
    .findById(req.params.id)
    .exec()
    .then(show => {
      req.body.user = req.currentUser;

      Review
        .create(req.body)
        .then(review => {
          show.reviews.push(review);
          return show.save();
        })
        .then(show => {
          req.flash('confirm', 'You have successfully commented on a show!');
          res.redirect(`/tvshows/${show._id}`);
        });
    });
}
//----------TV Review DELETE----------------------------------------------------
function reviewDelete(req, res) {
  Tvshow
    .findById(req.params.showId)
    .exec()
    .then(show => {
      const review = show.reviews.id(req.params.reviewId);
      review.remove();
      return show.save();
    })
    .then(show => res.redirect(`/tvshows/${show._id}`))
    .catch(err => res.render('error', { err }));
}
//------------------------------------------------------------------------------
module.exports = {
  index: tvshowsIndex,
  new: tvshowsNew,
  show: tvshowsShow,
  edit: tvshowsEdit,
  delete: tvshowsDelete,
  create: tvshowsCreate,
  update: tvshowsUpdate,
  commentNew: reviewCreate,
  commentDelete: reviewDelete
};
