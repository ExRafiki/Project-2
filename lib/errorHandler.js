function errorHandler(req, res, next){
  res.badRequest = function(template, errors){
    req.flash('danger', errors);
    return res.render(template);
  };
  next();
}
//------------------------------------------------------------------------------
module.exports = errorHandler;
