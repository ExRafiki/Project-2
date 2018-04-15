const router = require('express').Router();
const tvshow = require('../controllers/tvshows');
//--------ROUTES Connecting functions and pages---------------------------------
router.get('/', (req,res) => res.render('tvshows/home'));

router.route('/tvshows')
  .get(tvshow.index)
  .post(tvshow.create);

router.route('/tvshows/new')
  .get(tvshow.new);

router.route('/tvshows/:id')
  .get(tvshow.show)
  .delete(tvshow.delete)
  .put(tvshow.update);

router.route('/tvshows/:id/edit')
  .get(tvshow.edit);
//------------------------------------------------------------------------------
module.exports = router;
