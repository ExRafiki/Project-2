const router        = require('express').Router();
const tvshow        = require('../controllers/tvshows');
const registrations = require('../controllers/registrations');
const sessions      = require('../controllers/sessions');
// //------------------------------------------------------------------------------
function secureRoute(req, res, next){
  if(!req.session.userId){
    return req.session.regenerate(() =>{
      req.flash('danger', 'You must be logged in');
      res.redirect('/');
    });
  }
  return next();
}
//--------ROUTES TO PAGES-------------------------------------------------------
router.get('/', (req,res) => res.render('tvshows/home'));

router.route('/tvshows')
  .get(tvshow.index)
  .post(tvshow.create);

router.route('/tvshows/new')
  .get(secureRoute, tvshow.new);

router.route('/tvshows/:id')
  .get(tvshow.show)
  .delete(tvshow.delete)
  .put(tvshow.update);

router.route('/tvshows/:id/edit')
  .get(tvshow.edit);
//--------ROUTES TO LOGIN-------------------------------------------------------
router.route('/signin')
  .get(sessions.new)
  .post(sessions.create);

router.route('/signup')
  .get(registrations.new)
  .post(registrations.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/*').get((req, res) =>{
  req.flash('danger', 'THE URL REQUEST AINT HERE');
  res.render('statics/404.ejs');
  res.redirect('/');
});
//------------------------------------------------------------------------------
module.exports = router;
