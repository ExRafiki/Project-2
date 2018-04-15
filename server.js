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
app.use(routes);
//------Port-Listen-------------------------------------------------------------
app.listen(port, () => console.log(`Express started on port: ${port}`));
