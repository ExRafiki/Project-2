const Tvshow = require('../models/show');
const Review = require('../models/review');
//----------TV SHOW MODELS 7---------------------------------------------------
function tvshowsIndex(req, res){
  Tvshow
    .find()
    .populate('user')
    .exec()
    .then(tvshows => {
      res.render('tvshows/index', {tvshows});
    });
}
//------------------------------------------------------------------------------
function tvshowsNew(req,res){
  res.render('tvshows/new');
}
//------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------
function tvshowsEdit(req,res){
  Tvshow
    .findById(req.params.id)
    .populate('reviews')
    .exec()
    .then(tvshow => {
      res.render('tvshows/edit', {tvshow});
    });
}
//------------------------------------------------------------------------------
function tvshowsDelete(req, res){
  Tvshow
    .findById(req.params.id)
    .exec()
    .then(tvshow => tvshow.remove())
    .then(() => res.redirect('/tvshows'));
}
//------------------------------------------------------------------------------
function tvshowsCreate(req, res){
  req.body.user = req.currentUser;

  Tvshow
    .create(req.body)
    .then(() => res.redirect('/tvshows'));
}
//------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------
function commentCreate(req, res){
  // const Comment = Tvshow.comment.id(req.params.commentId);// trying to get the comment individually req not defined
  // // req.body.user = req.currentUser;
  // Comment
  //   .findById(req.params.id)
  //   .exec()
  //   .then(tvshow => {
  //     tvshow.comment.push(req.body);
  //     return tvshow.save();
  //   });
  // // add a catch error after here ?
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
          res.redirect(`/tvshows/${show._id}`);
        });
    });
}
//------------------------------------------------------------------------------
function commentDelete(req, res) {
  Tvshow
    .findById(req.params.showId)
    .exec()
    .then(show => {
      const review = show.reviews.id(req.params.reviewId);
      review.remove();
      return show.save();
    })
    .then(show => res.redirect(`/tvshows/${show._id}`));

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
  commentNew: commentCreate,
  commentDelete: commentDelete
};
