const databaseURI = process.env.MONGODB_URI || 'mongodb://localhost/justtv';
const port        = process.env.PORT || 4000;
//------------------------------------------------------------------------------
module.exports = {databaseURI, port};
