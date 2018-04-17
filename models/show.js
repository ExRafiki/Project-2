const mongoose = require('mongoose');
const review   = require('./review');
//------------------------------------------------------------------------------
const showSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String},
  year: Date,
  popularity: { type: String},
  season: { type: Number},
  platform: { type: String},
  image: { type: String, required: true },
  reviews: [{type: mongoose.Schema.ObjectId, ref: 'Review'}],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});
//------------------------------------------------------------------------------
module.exports = mongoose.model('Show', showSchema);
