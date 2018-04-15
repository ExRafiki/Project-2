const mongoose     = require('mongoose');
const posterSchema = new mongoose.Schema({
//-----------------------------------------------------------------------------
  url: String,
  comments: [{
    type: String
  }],
  tvshow: {type: mongoose.Schema.ObjectId, ref: 'Tvshow'}
});
//------------------------------------------------------------------------------
module.exports = mongoose.model('Poster', posterSchema);
