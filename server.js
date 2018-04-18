// create seed , run nodemon aswell as mongod before starting.
//-------MIDDLEWARE-------------------------------------------------------------
const express               = require('express');
const app                   = express();
const morgan                = require('morgan');
const bodyParser            = require('body-parser');
const mongoose              = require('mongoose');
const routes                = require('./config/routes');
const expressLayouts        = require('express-ejs-layouts');
const methodOverride        = require('method-override');
const { port, databaseURI } = require('./config/environment');
const User                  = require('./models/user');
const flash                 = require('express-flash');
const session               = require('express-session');
const errorHandler          = require('./lib/errorHandler');
//------Connecting db and promise-----------------------------------------
mongoose.Promise            = require('bluebird');
mongoose.connect(databaseURI);
//------SET AND USE-------------------------------------------------------------
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);
app.use(methodOverride(req =>{
  if(req.body && typeof req.body === 'object' &&'_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
//------SESSIONS AND USER ID CHECK----------------------------------------------
app.use(session({
  secret: process.env.SESSION_SECRET || 'well aint this some shit',
  resave: false,
  saveUnitialized: false
}));
app.use(flash());
app.use(errorHandler);

app.use((req, res, next) =>{
  if(!req.session.userId) return next();

  User
    .findById(req.session.userId)
    .then((user) =>{
      req.session.userId = user._id;
      res.locals.user = user;
      req.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });
});

app.use(routes);

//-------500 ERROR--------------------------------------------------------------
app.use((err, req, res, next) => {
  err.status = err.status || 500  ;
  err.message = err.message || 'Interval Server Error';
  res.status(err.status);
  res.locals.err = err;

  return res.render(`statics/${err.status}`);
});
//------Port-Listen and use route-----------------------------------------------
app.listen(port, () => console.log(`Express started on port: ${port}`));
