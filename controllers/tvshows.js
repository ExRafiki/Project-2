const Tvshow = require('../models/show');
//----------TV SHOW MODELS 7---------------------------------------------------
function tvshowsIndex(req, res){
  Tvshow
    .find()
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
    .populate('posters')
    .exec()
    .then(tvshow => {
      res.render('tvshows/show', {tvshow});
    });
}
//------------------------------------------------------------------------------
function tvshowsEdit(req,res){
  Tvshow
    .findById(req.params.id)
    .populate('posters')
    .exec()
    .then(tvshow => {
      res.render('tvshows/edit', {tvshow});
    });
}

function tvshowsDelete(req, res){
  Tvshow
    .findById(req.params.id)
    .exec()
    .then(tvshow => tvshow.remove())
    .then(() => res.redirect('/tvshows'));
}
//------------------------------------------------------------------------------
function tvshowsCreate(req, res){
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
module.exports = {
  index: tvshowsIndex,
  new: tvshowsNew,
  show: tvshowsShow,
  edit: tvshowsEdit,
  delete: tvshowsDelete,
  create: tvshowsCreate,
  update: tvshowsUpdate
};
