const mongoose = require('mongoose');
const poster   = require('./poster');
//------------------------------------------------------------------------------
const showSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String},
  year: Date,
  popularity: { type: String},
  season: { type: Number},
  platform: { type: String},
  image: { type: String, required: true },
  posters: [{type: mongoose.Schema.ObjectId, ref: 'Poster'}]
});
//------------------------------------------------------------------------------
module.exports = mongoose.model('Show', showSchema);
